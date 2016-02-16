import ShaderProgram from "./ShaderProgram";
import {AbstractTexture} from "../../visual/display/AbstractTexture";

class UniformLocation
{
	protected _gl:WebGLRenderingContext = null;
	protected _name:string;
	protected _type:number;
	protected _location:WebGLUniformLocation;
	protected _value:any;

	constructor(gl:WebGLRenderingContext, name:string, location:WebGLUniformLocation, type:number)
	{
		this._gl = gl;
		this._name = name;
		this._location = location;
		this._type = type;
	}

	public getName():string
	{
		return this._name;
	}

	public getType():number
	{
		return this._type;
	}

	public getValue():any
	{
		return this._value;
	}

	public setValue(value):this
	{
		var gl = this._gl;

		if( this._value !== value || ( this._type != gl.FLOAT && this._type != gl.INT ))
		{
			this._value = value;


			switch(this._type)
			{
				case gl.FLOAT:{
					gl.uniform1f(this._location, value);
					break;
				}

				case gl.INT:{
					gl.uniform1i(this._location, value);
					break;
				}

				case gl.FLOAT_VEC2:{
					gl.uniform2fv(this._location, value);
					break;
				}

				case gl.FLOAT_MAT2:{
					gl.uniformMatrix2fv(this._location, false, value);
					break;
				}

				case gl.FLOAT_MAT3:{
					gl.uniformMatrix3fv(this._location, false, value);
					break;
				}

				case gl.FLOAT_MAT4:{
					gl.uniformMatrix4fv(this._location, false, value);
					break;
				}

				case gl.FLOAT_VEC2:{
					gl.uniform2fv(this._location, value);
					break;
				}

				case gl.FLOAT_VEC3:{
					gl.uniform3fv(this._location, value);
					break;
				}

				case gl.FLOAT_VEC4:{
					gl.uniform4fv(this._location, value);
					break;
				}

				case gl.SAMPLER_2D:{

					if(value >= 0 && value < 16){
						gl.uniform1i(this._location, value);
					} else if(value instanceof AbstractTexture ){

					}

					break;
				}


			}
		}
		return this;
	}

	public get name()
	{
		return this._name;
	}

	public get value()
	{
		return this._value;
	}

	public set value(value:any)
	{
		this.setValue(value);
	}

	public activate(){
		var value = this._value;
		if(this._type != this._gl.SAMPLER_2D){
			throw new TypeError('activate can only be triggerd with a sampler2d uniform');
		}

		if(value < 0 || value > 15 || value === void 0){
			throw new TypeError('value can only be 0 - 15');
		}

		if(value === 0){
			this._gl.activeTexture(this._gl.TEXTURE0);
		} else if(value === 1){
			this._gl.activeTexture(this._gl.TEXTURE1);
		} else if(value === 2){
			this._gl.activeTexture(this._gl.TEXTURE2);
		} else if(value === 3){
			this._gl.activeTexture(this._gl.TEXTURE3);
		} else if(value === 4){
			this._gl.activeTexture(this._gl.TEXTURE4);
		} else if(value === 5){
			this._gl.activeTexture(this._gl.TEXTURE5);
		} else if(value === 6){
			this._gl.activeTexture(this._gl.TEXTURE6);
		} else if(value === 7){
			this._gl.activeTexture(this._gl.TEXTURE7);
		} else if(value === 8){
			this._gl.activeTexture(this._gl.TEXTURE8);
		} else if(value === 9){
			this._gl.activeTexture(this._gl.TEXTURE9);
		} else if(value === 10){
			this._gl.activeTexture(this._gl.TEXTURE10);
		} else if(value === 11){
			this._gl.activeTexture(this._gl.TEXTURE11);
		} else if(value === 12){
			this._gl.activeTexture(this._gl.TEXTURE12);
		} else if(value === 13){
			this._gl.activeTexture(this._gl.TEXTURE13);
		} else if(value === 14){
			this._gl.activeTexture(this._gl.TEXTURE14);
		} else if(value === 15) {
			this._gl.activeTexture(this._gl.TEXTURE15);
		}
	}
}

export default UniformLocation;