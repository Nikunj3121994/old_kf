import Shader from "../../../src/core/webgl/Shader";
import ShaderType from "../../../src/core/webgl/ShaderType";
import ShaderProgram from "../../../src/core/webgl/ShaderProgram";
import {CanvasWebGL} from "../../../src/visual/renderer/element/CanvasWebGL";
import {Mesh} from "../../../src/core/webgl/Mesh";

var canvas = new CanvasWebGL(void 0, 1024, 1024);
canvas.appendTo(document.body.querySelector('[container="main"]'))
var gl = canvas.getContext();

var quad = Mesh.createQuad();

quad.initBuffer(gl)
//// Create an empty buffer object to store vertex buffer
//var vertex_buffer = gl.createBuffer();
//
//// Bind appropriate array buffer to it
//gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
//
//// Pass the vertex data to the buffer
//gl.bufferData(gl.ARRAY_BUFFER, quad.vertex, gl.STATIC_DRAW);
//
//// Unbind the buffer
//gl.bindBuffer(gl.ARRAY_BUFFER, null);
//
//// Create an empty buffer object to store Index buffer
//var Index_Buffer = gl.createBuffer();
//
//// Bind appropriate array buffer to it
//gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
//
//// Pass the vertex data to the buffer
//gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,  quad.index, gl.STATIC_DRAW);
//
//// Unbind the buffer
//gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

/*====================== Shaders =======================*/

// Vertex shader source code
var vertex = new Shader(ShaderType.VERTEX, `
attribute vec3 coordinates;

void main(void) {
 gl_Position = vec4(coordinates, 1.0);
}
`);

var fragment = new Shader(ShaderType.FRAGMENT, `
precision mediump float;
uniform float time;
void main(void) {
	gl_FragColor = vec4(sin(time), sin(time), sin(time), 1);
}
`);

var program = new ShaderProgram(gl, vertex, fragment);
program.useProgram();

var uLocations = program.getUniformLocations();


/* ======= Associating shaders to buffer objects =======*/

//// Bind vertex buffer object
//gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
//
//// Bind index buffer object
//gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
quad.bindBuffer(gl);


// Get the attribute location
var coord = program.getAttribLocation("coordinates");

// Point an attribute to the currently bound VBO
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

// Enable the attribute
gl.enableVertexAttribArray(coord);

/*============= Drawing the Quad ================*/
//gl.viewport(0,0,canvas.width / 2 | 0,canvas.height / 2 | 0);

// Enable the depth test
gl.enable(gl.DEPTH_TEST);

var time = (() => {
	var prev = 0;
	return () => {
		var current = new Date().getTime();
		if(prev == 0){
			prev = current;
		}
		let ntime = current;
		prev = current;
		return ntime / 1000 | 0;
	}
})()


var render = () => {

	uLocations.time.value = new Date().getTime() / 1000;

	// Clear the canvas
	gl.clearColor(0.0, 0.0, 0.0, 1);


	// Draw the triangle
	gl.drawElements(gl.TRIANGLES, quad.length, gl.UNSIGNED_SHORT,0);
}

setInterval(render, 1000/60);