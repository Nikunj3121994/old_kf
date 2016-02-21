import ShaderType from "./ShaderType";
import {HttpRequest} from "../../core/net/HttpRequest";
import {Promise} from "../../core/util/Promise";
import {ILoadable} from "../interface/ILoadable";

/**
 *
 */
export class Shader implements ILoadable<Shader>
{
	public static createFromUrl(type:ShaderType, url:string):Promise<Shader>
	{
		return HttpRequest.getString<string>(url).then((data:string) => {
			return new Shader(type, data);
		})
	}

	public type:ShaderType;
	public shader:WebGLShader;

	protected _data:string;
	protected _promise:Promise<this>;
	protected _request:HttpRequest<string>;
	protected _hasLoaded:boolean = false;

	constructor(type:ShaderType, data:string|HttpRequest<string>)
	{
		this.type = type;

		if(data && typeof data == 'string'){
			this._hasLoaded = true;
			this._data = <string> data;
		} else {
			this._hasLoaded = false;
			this._request = <HttpRequest<string>> data;
		}
	}

	public hasLoaded():boolean
	{
		return this._hasLoaded;
	}

	public load(onProgress?:(progress:number)=>any):Promise<Shader>
	{
		if(!this._data && !this._request){
			throw new Error('data has not been set so load has nothing to load.')
		} else if(this._data) {
			if(onProgress) onProgress(1);
			return Promise.resolve<Shader>(this);
		} else {
			if(!this._promise){
				this._promise = new Promise<Shader>((resolve) => {
					this._request.load().then(data => {
						this._hasLoaded = true;
						this._data = data;
						resolve(this);
					})
				})
			}
			return this._promise;
		}

		return null;
	}

	public getShader(gl:WebGLRenderingContext):WebGLShader
	{
		if(!this.shader)
		{
			if(this.type == ShaderType.FRAGMENT)
			{
				this.shader = gl.createShader(gl.FRAGMENT_SHADER);
			}
			else if(this.type == ShaderType.VERTEX)
			{
				this.shader = gl.createShader(gl.VERTEX_SHADER);
			}

			gl.shaderSource(this.shader, this._data);
			gl.compileShader(this.shader);

			if(!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS))
			{
				throw new Error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(this.shader));
			}
		}

		return this.shader;
	}

	public deleteShader(gl:WebGLRenderingContext):void
	{
		if(this.shader)
		{
			gl.deleteShader(this.shader);
			this.shader = void 0;
		}

	}

	public toString():string
	{
		return this._data;
	}

	public destruct():void
	{
		this._data = void 0;
		this._promise = void 0;
		this._request = void 0;
	}
}