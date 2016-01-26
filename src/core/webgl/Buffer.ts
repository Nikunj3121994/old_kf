class Buffer {

    gl:WebGLRenderingContext;
    buffer:WebGLBuffer;
    type:number;
    usage:number;
    data:Float32Array|Uint16Array;

    constructor(gl:WebGLRenderingContext, data:Float32Array|Uint16Array, type?:number, usage?:number){

        this.gl = gl;
        this.data = data;
        this.type = type || gl.ARRAY_BUFFER;
        this.usage = usage || gl.STATIC_DRAW;

        // Create an empty buffer object to store vertex buffer
        this.buffer = gl.createBuffer();

        // Bind appropriate array buffer to it
        gl.bindBuffer(this.type, this.buffer);

        // Pass the vertex data to the buffer
        gl.bufferData(this.type, this.data, this.usage);

        // Unbind the buffer
        gl.bindBuffer(this.type, null);
    }

    bind(){
        this.gl.bindBuffer(this.type, this.buffer);
    }

    unbind(){
        this.gl.bindBuffer(this.type, null);
    }
}

export default Buffer;