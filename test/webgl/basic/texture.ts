import Shader from "../../../src/core/webgl/Shader";
import ShaderType from "../../../src/core/webgl/ShaderType";
import ShaderProgram from "../../../src/core/webgl/ShaderProgram";
import {CanvasWebGL} from "../../../src/visual/renderer/element/CanvasWebGL";

var canvas = new CanvasWebGL(void 0, 1024, 1024);
canvas.appendTo(document.body.querySelector('[container="main"]'))
var gl = canvas.getContext();

var vertices = [
	-1.0, 1.0,  0.0,
	-1.0, -1.0, 0.0,
	1.0,  -1.0, 0.0,
	1.0,  1.0,  0.0
];

var indices = [3, 2, 1, 3, 1, 0];


// Create an empty buffer object to store vertex buffer
var vertex_buffer = gl.createBuffer();

// Bind appropriate array buffer to it
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

// Pass the vertex data to the buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Unbind the buffer
gl.bindBuffer(gl.ARRAY_BUFFER, null);

// Create an empty buffer object to store Index buffer
var Index_Buffer = gl.createBuffer();

// Bind appropriate array buffer to it
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

// Pass the vertex data to the buffer
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

// Unbind the buffer
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

/*====================== Shaders =======================*/

// Vertex shader source code
var vertex = new Shader(ShaderType.VERTEX, `
attribute vec3 vcoordinates;
uniform sampler2D texture;
varying vec2 tcoordinates;
void main(void) {
 gl_Position = vec4(vcoordinates, 1.0);
 tcoordinates = vec2(vcoordinates.xy);
}
`);

var fragment = new Shader(ShaderType.FRAGMENT, `
varying vec2 tcoordinates;
void main(void) {
	gl_FragColor = texture2D(texture, tcoordinates);
}
`);

var program = new ShaderProgram(gl, vertex, fragment);
program.useProgram();

/* ======= Associating shaders to buffer objects =======*/

// Bind vertex buffer object
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

// Bind index buffer object
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

// Get the attribute location
var coord = program.getAttribLocation("vcoordinates");

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

	// Clear the canvas
	gl.clearColor(0.5, 0.5, 0.5, 0.9);

	// Clear the color buffer bit
	gl.clear(gl.COLOR_BUFFER_BIT);

	// Set the view port

	// Draw the triangle
	gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);
	console.log(time());
	
}

setInterval(render, 1000/30);