import Shader from "../../../src/core/webgl/Shader";
import ShaderType from "../../../src/core/webgl/ShaderType";
import ShaderProgram from "../../../src/core/webgl/ShaderProgram";
import {CanvasWebGL} from "../../../src/visual/renderer/element/CanvasWebGL";
import {Mesh} from "../../../src/core/webgl/Mesh";
import Interval from "../../../src/core/util/Interval";
import Time from "../../../src/core/util/Time";
import Buffer from "../../../src/core/webgl/Buffer";
import {Geometry} from "../../../src/core/webgl/Geometry";
import {mat4, vec3, vec4} from "../../../src/vendor/gl-matrix/gl-matrix";
import {GUI} from "../../../src/vendor/dat.gui/dat.gui";


var canvas = new CanvasWebGL(void 0, 1024, 1024);
canvas.appendTo(document.body.querySelector('[container="main"]'))
var gl = canvas.getContext();

var quad = Geometry.QUAD;

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
attribute vec3 aVertexPosition;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float uTime;
varying vec3 color;

void main(void) {

 color = vec3(sin(uTime) * .5 + .5, cos(uTime) * .5 + .5, sin(uTime*.5) * .5 + .5);
 vec3 pos = color * aVertexPosition;
 gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);
}
`);

var fragment = new Shader(ShaderType.FRAGMENT, `
precision lowp float;
varying vec3 color;

void main(void) {
	gl_FragColor = vec4(color, 1.0);
}
`);

var program = new ShaderProgram(gl, vertex, fragment).use();


/* ======= Associating shaders to buffer objects =======*/

//// Bind vertex buffer object
//gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
//
//// Bind index buffer object
//gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
//quad.bind();
var coord = program.defineAttribute("aVertexPosition", 3);
var quadBuffer = new Buffer(gl, quad);
quadBuffer.bind();
coord.point().enable();
//var indexBuffer = new Buffer(gl, quad.index, gl.ELEMENT_ARRAY_BUFFER);
//vertexBuffer.bind();
//indexBuffer.bind();
//coord.point().enable();


//// Get the attribute location
var uMVMatrix = program.getUniform("uMVMatrix");
var uPMatrix = program.getUniform("uPMatrix");
var uTime = program.getUniform("uTime");

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

var DEGREE_RAD = Math.PI / 180;

var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var position = vec3.create();


mat4.perspective(pMatrix, 45, canvas.width / canvas.height, 0.1, 100.0);


//Initialize Model-View matrix
//mat4.identity(mvMatrix);
mat4.translate(mvMatrix, mvMatrix, position);

var pos = {x:0, y:0, z:-2};

var gui = new GUI();
gui.add(pos, 'x', -50, 50);
gui.add(pos, 'y', -50, 50);
gui.add(pos, 'z', -50, 50);


var interval = new Interval(10).attach((delta:number) => {


	var current = Time.getSafeFromStart() / 100;
	//console.log(current, Time.getSafeFromStart());
	//quad.vertex[0] = -1 + Math.random()
	vec3.set(position, pos.x, pos.y, pos.z);

	mat4.identity(mvMatrix);
	mat4.translate(mvMatrix, mvMatrix, position);

	mat4.rotateX(mvMatrix, mvMatrix, current  * DEGREE_RAD);
	mat4.rotateY(mvMatrix, mvMatrix, (current* 10)  * DEGREE_RAD);
	mat4.rotateZ(mvMatrix, mvMatrix, (current* 10)  * DEGREE_RAD);

	uMVMatrix.value = mvMatrix;
	uPMatrix.value = pMatrix;
	uTime.value = current;

	// Clear the canvas
	gl.clearColor(0.0, 0.0, 0.0, 1);

	// Draw the triangle
	gl.drawElements(gl.TRIANGLES, quad.length, gl.UNSIGNED_SHORT,0);
});