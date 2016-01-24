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

	public destruct():void
	{
		this._gl = null;
		this.domElement = null;
	}
}