import ShaderProgram from "./ShaderProgram";
import Buffer from "./Buffer";
import {Mesh} from "./Mesh";

class AttributeLocation
{
	protected _gl:WebGLRenderingContext = null;
	protected _name:string;
	protected _type:number;
	protected _location:number;
	protected _value:any;

	protected _size:number;
	protected _normalized:boolean;
	protected _stride:number;
	protected _offset:number;

	constructor(gl:WebGLRenderingContext, location:number, name:string, size: number, type:number = gl.FLOAT, normalized: boolean = false, stride: number = 0, offset: number = 0)
	{
		this._gl = gl;
		this._name = name;
		this._location = location;
		this._size = size;
		this._type = type;
		this._normalized = normalized;
		this._stride = stride;
		this._offset = offset;
	}

	public point(...buffers:Array<Buffer|Mesh>):this
	{
		if(buffers.length > 0){

			if(buffers[0] instanceof Mesh){
				if(buffers.length>1){
					throw new Error('a attribute location can only point to one buffer')
				}

				let buffer = <Mesh> buffers[0];
				buffer.getVertexBuffer().bind();
				buffer.getIndexBuffer().bind();

				// Point an attribute to the currently bound VBO
				this._gl.vertexAttribPointer(this._location, this._size, this._type, this._normalized, this._stride, this._offset);

			} else {
				for(var i = 0; i < buffers.length; i++)
				{
					let buffer = buffers[i];
					buffer.bind();
				}

				// Point an attribute to the currently bound VBO
				this._gl.vertexAttribPointer(this._location, this._size, this._type, this._normalized, this._stride, this._offset);

			}

		}


		return this;
	}

	public enable()
	{
		// Enable the attribute
		this._gl.enableVertexAttribArray(this._location);
	}

}

export default AttributeLocation;