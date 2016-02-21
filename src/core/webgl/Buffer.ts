import {Geometry} from "./Geometry";

export class Buffer
{
	gl:WebGLRenderingContext;
	buffer:WebGLBuffer;
	type:number;
	usage:number;
	data:Float32Array|Uint16Array;

	protected _buffers:Array<Buffer> = null;
	public hasGeometry:boolean = false;
	public hasPassed:boolean = false;

	constructor(gl:WebGLRenderingContext, data:Float32Array|Uint16Array|Geometry, type?:number, usage?:number)
	{
		this.gl = gl;

		if(data instanceof Geometry){
			this.hasGeometry = true;
			this._buffers = [];
			var vbuffer = new Buffer(gl, data.vertex, gl.ARRAY_BUFFER, usage);
			var ibuffer = new Buffer(gl, data.index, gl.ELEMENT_ARRAY_BUFFER, usage);
			this._buffers.push(vbuffer);
			this._buffers.push(ibuffer);
		} else {
			this.data = <Float32Array|Uint16Array> data;
			this.type = type || gl.ARRAY_BUFFER;
			this.usage = usage || gl.STATIC_DRAW;

			// Create an empty buffer object to store vertex buffer
			this.buffer = gl.createBuffer();
		}

	}

	public update():this
	{
		if(!this.hasGeometry){
			// Bind appropriate array buffer to it
			this.gl.bindBuffer(this.type, this.buffer);

			// Pass the vertex data to the buffer
			this.gl.bufferData(this.type, this.data, this.usage);

			// Unbind the buffer
			this.gl.bindBuffer(this.type, null);
		} else {
			this._buffers[0].update();
			this._buffers[1].update();
		}

		this.hasPassed = true;
		return this;
	}


	public updateBind():this
	{
		if(!this.hasGeometry){
			// Bind appropriate array buffer to it
			this.gl.bindBuffer(this.type, this.buffer);

			// Pass the vertex data to the buffer
			this.gl.bufferData(this.type, this.data, this.usage);
		} else {
			this._buffers[0].updateBind();
			this._buffers[1].updateBind();
		}

		this.hasPassed = true;
		return this;
	}

	public bind():this
	{
		if(!this.hasPassed){
			this.updateBind();
		} else {
			if(!this.hasGeometry){
				this.gl.bindBuffer(this.type, this.buffer);
			} else {
				this._buffers[0].bind();
				this._buffers[1].bind();
			}
		}

		return this;
	}

	public unbind():this
	{
		if(!this.hasGeometry){
			this.gl.bindBuffer(this.type, null);
		} else {
			this._buffers[0].unbind();
			this._buffers[1].unbind();
		}

		return this;
	}
}