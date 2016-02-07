import Shader from "../../../src/core/webgl/Shader";
import ShaderType from "../../../src/core/webgl/ShaderType";
import ShaderProgram from "../../../src/core/webgl/ShaderProgram";
import {CanvasWebGL} from "../../../src/visual/renderer/element/CanvasWebGL";
import {Mesh} from "../../../src/core/webgl/Mesh";
import Interval from "../../../src/core/util/Interval";
import Time from "../../../src/core/util/Time";
import Buffer from "../../../src/core/webgl/Buffer";
import {Texture} from "../../../src/core/webgl/Texture";

var canvas = new CanvasWebGL(void 0, 1024, 1024);
canvas.appendTo(document.body.querySelector('[container="main"]'))
var gl = canvas.getContext();

var quad = Mesh.createQuad(gl);

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
attribute vec3 a_position;
attribute vec2 a_texcoord;
varying vec2 v_texcoord;

void main(void) {
 gl_Position = vec4(coordinates, 1.0);
 v_textcoord = a_textcoord;
}
`);

var fragment = new Shader(ShaderType.FRAGMENT, `
precision lowp float;
uniform float time;

uniform sampler2D u_texture;

void main(void) {

	gl_FragColor = texture2D(u_texture, v_texcoord);
}
`);

var program = new ShaderProgram(gl, vertex, fragment).use();

var uLocations = program.getUniformLocations();


/* ======= Associating shaders to buffer objects =======*/

//// Bind vertex buffer object
//gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
//
//// Bind index buffer object
//gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
//quad.bind();

var text = new Texture(gl)

var aPosition = program.defineAttribute("a_position", 3);
aPosition.point(quad).enable();

var uvBuffer = new Buffer(gl, new Float32Array([
	0, 0,
	0, 1,
	1, 0,
	0, 1,
	1, 1,
	1, 0
]));

var aTexcoord = program.defineAttribute("a_texcoord", 2);
aTexcoord.point(uvBuffer).enable();

//// Get the attribute location
//var coord = program.getAttribLocation("coordinates");
//
//// Point an attribute to the currently bound VBO
//gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
//
//// Enable the attribute
//gl.enableVertexAttribArray(coord);

/*============= Drawing the Quad ================*/

// Enable the depth test
gl.enable(gl.DEPTH_TEST);

var interval = new Interval(60).attach((delta:number) => {


	var current = Time.getSafeFromStart() / 1000;

	// Clear the canvas
	gl.clearColor(0.0, 0.0, 0.0, 1);
	uLocations['time'].setValue(current);

	// Draw the triangle
	gl.drawElements(gl.TRIANGLES, quad.length, gl.UNSIGNED_SHORT,0);
});