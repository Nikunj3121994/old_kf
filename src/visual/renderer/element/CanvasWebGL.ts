import {Canvas} from "./Canvas";

/**
 * Creates a Canvas element of the given size.
 *
 * @class Canvas
 * @param width {number} the width for the newly created canvas
 * @param height {number} the height for the newly created canvas
 */
export class CanvasWebGL extends Canvas
{
	protected _gl:WebGLRenderingContext;

	protected updateViewport():void
	{
		var gl = this.getContext();

		gl.viewport(0, 0, this._width | 0, this._height | 0);
	}

	public getContext():WebGLRenderingContext
	{
		if(!this._gl)
		{
			var gl = null;
			var canvas = this.domElement;

			try {
				// Try to grab the standard context. If it fails, fallback to experimental.
				gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
			}
			catch(e) {}

			// If we don't have a GL context, give up now
			if (!gl) {
				alert("Unable to initialize WebGL. Your browser may not support it.");
				gl = null;
			}

			this._gl = gl;
		}

		return this._gl;
	}

	public setHeight(value:number):void
	{
		super.setHeight(value);

		this.updateViewport();
	}

	public setWidth(value:number):void
	{
		super.setWidth(value);

		this.updateViewport();
	}

	public clear():void
	{
		this._gl.clear(this._gl.COLOR_BUFFER_BIT);
	}

	public getSettings():any
	{
		var gl  = this._gl;
		var obj:any = {};
		obj.MAX_COMBINED_TEXTURE_IMAGE_UNITS = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
		obj.MAX_CUBE_MAP_TEXTURE_SIZE = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
		obj.MAX_FRAGMENT_UNIFORM_VECTORS = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
		obj.MAX_RENDERBUFFER_SIZE = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
		obj.MAX_TEXTURE_IMAGE_UNITS = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
		obj.MAX_TEXTURE_SIZE = gl.getParameter(gl.MAX_TEXTURE_SIZE);
		obj.MAX_VARYING_VECTORS = gl.getParameter(gl.MAX_VARYING_VECTORS);
		obj.MAX_VERTEX_ATTRIBS = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
		obj.MAX_VERTEX_TEXTURE_IMAGE_UNITS = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
		obj.MAX_VERTEX_UNIFORM_VECTORS = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
		obj.MAX_VIEWPORT_DIMS = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
		return obj;
	}

	public destruct():void
	{
		this._gl = null;
		this.domElement = null;
	}
}