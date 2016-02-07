abstract class AbstractTexture
{

    gl:WebGLRenderingContext;
    source:ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    texture:WebGLTexture;

    // @todo implement some way of giving more options to AbstractTexture
    target:number;
    level:number;
    internalFormat:number;
    format:number;
    type:number;

    constructor(gl:WebGLRenderingContext, source:ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement)
    {
        this.gl = gl;
        this.source = source;
    }

    public abstract hasLoaded():boolean;

    protected getTexture():WebGLTexture
    {
        if(!this.texture)
        {
            var gl = this.gl;
            var texture = this.texture = gl.createTexture();
            this.bind();

            // Set up texture so we can render any size image and so we are
            // working with pixels.
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            this.unbind();

        }

        return this.texture;
    }

    protected isPowerOf2(value:number):boolean
    {
        return (value & (value - 1)) == 0;
    }

    public bind():this
    {
        var gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        return this;
    }

    public unbind():this
    {
        var gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, null);
        return this;
    }

    public update():this
    {
        var gl = this.gl;
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, <any> this.source);
        return this;
    }
}