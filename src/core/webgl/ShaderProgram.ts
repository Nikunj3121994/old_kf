
import Shader from "./Shader";
import IHashMap from "../../core/interface/IHashMap";
import UniformLocation from "./UniformLocation";
import AttributeLocation from "./AttributeLocation";

class ShaderProgram
{
	gl:WebGLRenderingContext;
	program:WebGLProgram;

	private _uniforms:any = null;
	private _attributes:IHashMap<AttributeLocation> = {};

	constructor(gl:WebGLRenderingContext, vertex:Shader, fragment:Shader)
	{
		this.gl = gl;
		this.program = gl.createProgram();

		// Create the shader program
		gl.attachShader(this.program, vertex.getShader(gl));
		gl.attachShader(this.program, fragment.getShader(gl));
		gl.linkProgram(this.program);

		// If creating the shader program failed, alert
		if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
			alert("Unable to initialize the shader program.");
		}
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
	 * @returns {IHashMap<WebGLUniformLocation>}
	 */
	public get uniforms()
	{
		return this.getUniformLocations();
	}

	public use():ShaderProgram
	{
		this.gl.useProgram(this.program);
		return this;
	}

	public get():WebGLProgram
	{
		return this.program;
	}

	public getParameter(parameter:number):any
	{
		return this.gl.getProgramParameter( this.program, parameter );
	}

	public getAttribLocation(value:string):number
	{
		return this.gl.getAttribLocation(this.program, value);
	}

	public defineAttribute(name:string, size: number, type:number = this.gl.FLOAT, normalized: boolean = false, stride: number = 0, offset: number = 0):AttributeLocation
	{
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
		return this.gl.getUniformLocation(this.program, value);
	}

	public getUniformLocations():IHashMap<UniformLocation>
	{
		if(!this._uniforms)
		{
			this._uniforms = this.fetchUniformLocations();
		}

		return this._uniforms;
	}

	public getUniform(name:string):UniformLocation
	{
		return this.getUniformLocations()[name];
	}

	protected fetchUniformLocations():IHashMap<UniformLocation>
	{
		var uniforms:IHashMap<UniformLocation> = {};
		var program = this.program;
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
		this.gl.deleteProgram(this.program);
		this.program = void 0;
		this.gl = void 0;
	}
}

export default ShaderProgram;