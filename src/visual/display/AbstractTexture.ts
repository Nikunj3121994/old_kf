
export abstract class AbstractTexture
{
	private static _id:number = 0;
	public static getID():number
	{
		return AbstractTexture._id++;
	}

	public static bind(gl:WebGLRenderingContext, texture:AbstractTexture):void
	{
		gl.bindTexture(gl.TEXTURE_2D, AbstractTexture.getTexture(gl, texture));
	}

	public static unbind(gl:WebGLRenderingContext, texture?:AbstractTexture):void
	{
		gl.bindTexture(gl.TEXTURE_2D, null);
	}

	public static update(gl:WebGLRenderingContext, texture:AbstractTexture):void
	{
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, <any> texture.source);
		gl.generateMipmap(gl.TEXTURE_2D);
	}

	public static getTexture(gl:WebGLRenderingContext, texture:AbstractTexture):WebGLTexture
	{
		if(!texture.texture)
		{
			texture.texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture.texture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);


			// Set up texture so we can render any size image and so we are
			// working with pixels.
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.bindTexture(gl.TEXTURE_2D, null);

		}

		return texture.texture;
	}

	public id:number = AbstractTexture.getID();
	public source:ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
	public texture:WebGLTexture;

	constructor(source:ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement)
	{
		this.source = source;
	}

	protected isPowerOf2(value:number):boolean
	{
		return (value & (value - 1)) == 0;
	}

}