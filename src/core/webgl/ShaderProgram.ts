
import IHashMap from "../../core/interface/IHashMap";
import GUI = dat.GUI;
import {Shader} from "./Shader";
import {AttributeLocation} from "./AttributeLocation";
import {UniformLocation} from "./UniformLocation"
import {ILoadable} from "../interface/ILoadable";
import {Promise} from "../util/Promise";
import {PromiseUtil} from "../util/PromiseUtil";
import ShaderType from "./ShaderType";
import {HttpRequest} from "../net/HttpRequest";

export class ShaderProgram implements ILoadable<ShaderProgram>
{

	public gl:WebGLRenderingContext;
	protected _program:WebGLProgram;
	protected _vertex:Shader;
	protected _fragment:Shader;

	private _isLinked:boolean = false;
	private _hasLoaded:boolean = false;
	private _promise:Promise<this>;

	private _uniforms:any = null;
	private _attributes:IHashMap<AttributeLocation> = {};

	constructor(gl:WebGLRenderingContext, vertex:string|Shader, fragment:string|Shader)
	{
		this.gl = gl;
		this._program = gl.createProgram();

		if(typeof vertex == 'string')
		{
			this._vertex = new Shader(ShaderType.VERTEX, new HttpRequest<string>( <string> vertex, null));
		} else {
			this._vertex = <Shader> vertex;
		}

		if(typeof fragment == 'string')
		{
			this._fragment = new Shader(ShaderType.VERTEX, new HttpRequest<string>( <string> fragment, null));
		} else {
			this._fragment = <Shader> fragment;
		}

		if(this._vertex.hasLoaded() && this._fragment.hasLoaded()){
			this._hasLoaded = true;
			if(!this._isLinked) this.link();
		}
	}

	public hasLoaded():boolean
	{
		return this._hasLoaded;
	}

	public load(onProgress?:(progress:number)=>any):Promise<ShaderProgram>
	{
		if(!this._promise){
			this._program = PromiseUtil.allForLoadable<Shader>([this._vertex, this._fragment], onProgress).then<ShaderProgram>(() => {
				this.link();
				return this;
			});
		}

		return this._promise;
	}

	/**
	 *
	 * @returns {IHashMap<AttributeLocation>}
	 */
	public get attributes()
	{
		return this._attributes;
	}

	/**
	 *
	 * @returns {IHashMap<UniformLocation>}
	 */
	public get uniforms()
	{
		return this.getUniforms();
	}

	protected link():ShaderProgram
	{
		if(!this._isLinked)
		{
			var gl = this.gl;
			// Create the shader program
			gl.attachShader(this._program, this._vertex.getShader(gl));
			gl.attachShader(this._program, this._fragment.getShader(gl));
			gl.linkProgram(this._program);

			this._vertex.deleteShader(gl);
			this._fragment.deleteShader(gl);

			this._vertex = null;
			this._fragment = null;

			// If creating the shader program failed, alert
			if (!gl.getProgramParameter(this._program, gl.LINK_STATUS)) {
				alert("Unable to initialize the shader program.");
				throw new Error("Unable to initialize the shader program.");
			}

			this._isLinked = true;
		}

		return this;
	}

	/**
	 * WebGL start using this program
	 * @method use
	 * @returns {ShaderProgram}
	 */
	public use():ShaderProgram
	{
		if(!this._isLinked) this.link();

		if(!this.hasLoaded()){
			throw new Error('can not use program when shaders are not loaded yet')
		}

		this.gl.useProgram(this._program);
		return this;
	}

	/**
	 * Returns WebGLProgram program
	 *
	 * @method get
	 * @returns {WebGLProgram}
	 */
	public get():WebGLProgram
	{
		return this._program;
	}

	public getParameter(parameter:number):any
	{
		if(this._isLinked) this.link();

		return this.gl.getProgramParameter( this._program, parameter );
	}

	public getAttribLocation(value:string):number
	{
		if(this._isLinked) this.link();

		return this.gl.getAttribLocation(this._program, value);
	}

	public defineAttribute(name:string, size: number, type:number = this.gl.FLOAT, normalized: boolean = false, stride: number = 0, offset: number = 0):AttributeLocation
	{
		if(this._isLinked) this.link();

		if(this._attributes[name])
		{
			throw new Error('attribute already defined');
		}

		var location = this.getAttribLocation(name)
		this._attributes[name] = new AttributeLocation(this.gl, location, name, size, type, normalized, stride, offset);

		return this._attributes[name];
	}

	public getAttribute(name:string):AttributeLocation
	{
		return this._attributes[name];
	}

	public getUniformLocation(value:string):WebGLUniformLocation
	{
		if(this._isLinked) this.link();

		return this.gl.getUniformLocation(this._program, value);
	}

	public getUniforms():IHashMap<UniformLocation>
	{
		if(!this._uniforms)
		{
			if(this._isLinked) this.link();

			this._uniforms = this.fetchUniformLocations();
		}

		return this._uniforms;
	}

	public getUniform(name:string):UniformLocation
	{
		return this.getUniforms()[name];
	}

	protected fetchUniformLocations():IHashMap<UniformLocation>
	{
		var uniforms:IHashMap<UniformLocation> = {};
		var program = this._program;
		var gl = this.gl;

		var n = this.getParameter( gl.ACTIVE_UNIFORMS );

		for ( var i = 0; i < n; i ++ ) {

			var info = gl.getActiveUniform( program, i );
			var name = info.name;
			var type = info.type;
			var location = this.getUniformLocation( name );

			// console.log("ACTIVE UNIFORM:", name);

			//var suffixPos = name.lastIndexOf( '[0]' );
			//if ( suffixPos !== - 1 && suffixPos === name.length - 3 ) {
			//
			//	uniforms[ name.substr( 0, suffixPos ) ] = location;
			//}

			uniforms[ name ] = new UniformLocation(this.gl, name, location, type);
		}

		return uniforms;
	}

	//protected fetchAttributeLocations():IHashMap<number>
	//{
	//	var attributes:IHashMap<number> = {};
	//
	//	var n = this.getParameter( this.gl.ACTIVE_ATTRIBUTES );
	//	var program = this.program;
	//	var gl = this.gl;
	//
	//	for ( var i = 0; i < n; i ++ ) {
	//
	//		var info = gl.getActiveAttrib( program, i );
	//		var name = info.name;
	//		var type = info.type;
	//		var location = this.getAttribLocation(name);
	//
	//		attributes[name] = new AttributeLocation(gl, name, location, type);
	//
	//	}
	//
	//	return attributes;
	//}

	public destruct():void
	{
		this._vertex = null;
		this._fragment.deleteShader(this.gl);

		this.gl.deleteProgram(this._program);
		this._program = void 0;
		this.gl = void 0;
	}
}