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
        return new Mesh(vertices, indices);
    }

    public vertex:Float32Array;
    public index:Uint16Array;
    public length:number;

    public vertexBuffer:WebGLBuffer;
    public indexBuffer:WebGLBuffer;

    constructor(vertex:Array<number>, index:Array<number>)
    {

        this.vertex = new Float32Array(vertex);
        this.index = new Uint16Array(index);
        this.length = this.index.length;
    }

    initBuffer(gl:WebGLRenderingContext){
        if(!this.vertexBuffer)
        {
            // Create an empty buffer object to store vertex buffer
            this.vertexBuffer = gl.createBuffer();

            // Bind appropriate array buffer to it
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

            // Pass the vertex data to the buffer
            gl.bufferData(gl.ARRAY_BUFFER, this.vertexBuffer, gl.STATIC_DRAW);

            // Unbind the buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        }

        if(!this.indexBuffer)
        {

            // Create an empty buffer object to store Index buffer
            this.indexBuffer = gl.createBuffer();

            // Bind appropriate array buffer to it
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

            // Pass the vertex data to the buffer
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.index, gl.STATIC_DRAW);

            // Unbind the buffer
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        }
    }

    bindBuffer(gl:WebGLRenderingContext){

        // Bind appropriate array buffer to it
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

        // Bind appropriate array buffer to it
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    }


    unbindBuffer(gl:WebGLRenderingContext){

        // Bind appropriate array buffer to it
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        // Bind appropriate array buffer to it
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    }
}
