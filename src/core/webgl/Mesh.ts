import Buffer from "./Buffer";
export class Mesh
{
    public static createQuad(gl:WebGLRenderingContext):Mesh
    {
        var vertices = [
            -1.0, 1.0,  0.0,
            -1.0, -1.0, 0.0,
            1.0,  -1.0, 0.0,
            1.0,  1.0,  0.0
        ];

        var indices = [3, 2, 1, 3, 1, 0];
        return new Mesh(gl, vertices, indices);
    }

    protected _gl:WebGLRenderingContext;
    public length:number;

    public vertex:Float32Array;
    public index:Uint16Array;
    public vertexBuffer:Buffer;
    public indexBuffer:Buffer;

    constructor(gl:WebGLRenderingContext, vertex:Array<number>, index:Array<number>)
    {

        this._gl = gl;
        this.vertex = new Float32Array(vertex);
        this.index = new Uint16Array(index);
        this.length = index.length;
    }

    public bind()
    {
        var gl = this._gl;

        if(!this.vertexBuffer) {
            this.vertexBuffer = new Buffer(gl, this.vertex, gl.ARRAY_BUFFER, gl.STATIC_DRAW);
        }

        if(!this.indexBuffer){
            this.indexBuffer = new Buffer(gl, this.index, gl.ELEMENT_ARRAY_BUFFER, gl.STATIC_DRAW);
        }

        this.vertexBuffer.bind();
        this.indexBuffer.bind();
    }

    public unbind(){

        this.vertexBuffer.unbind();
        this.indexBuffer.unbind();
    }
}
