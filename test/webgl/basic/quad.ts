

import {CanvasWebGL} from "../../../src/visual/renderer/element/CanvasWebGL";
import {Geometry} from "../../../src/core/webgl/Geometry";
import {ShaderProgram} from "../../../src/core/webgl/ShaderProgram";
import {Buffer} from "../../../src/core/webgl/Buffer";
import GUI = dat.GUI;
import Interval from "../../../src/core/util/Interval";
import Time from "../../../src/core/util/Time";
import {mat4, vec3} from "../../../src/vendor/gl-matrix/gl-matrix";
import {Camera} from "../../../src/core/webgl/Camera";
import {Texture} from "../../../src/visual/display/Texture";
import {PromiseUtil} from "../../../src/core/util/PromiseUtil";

var canvas = new CanvasWebGL(void 0, 1024, 1024);
canvas.appendTo(document.body.querySelector('[container="main"]'));
var gl = canvas.getContext();
var quad = Geometry.QUAD;
var camera = new Camera(canvas);

var pos = {x:0, y:0, z:-2};

var gui = new GUI();
gui.add(pos, 'x', -50, 50);
gui.add(pos, 'y', -50, 50);
gui.add(pos, 'z', -50, 50);

var texture = Texture.createFromUrl('../uv.jpg');
var program = ShaderProgram.createFromUrl(gl, "./quad/shader.v.glsl", "./quad/shader.f.glsl");

PromiseUtil.loadLoadable<any>([texture, program]).then(() => {

	program.use();

	var uMatrix = program.getUniform("uMatrix");
	var aVertexPosition = program.defineAttribute("aVertexPosition", 3);

	var quadBuffer = new Buffer(gl, quad).bind();
	aVertexPosition.point().enable();

})

//
// // Vertex shader source code
// var program = new ShaderProgram(gl, "./quad/shader.v.glsl", "./quad/shader.f.glsl");
// program.load().then(() => {
//
// })
//
// var coord = program.defineAttribute("aVertexPosition", 3);
// var quadBuffer = new Buffer(gl, quad);
// quadBuffer.bind();
// coord.point().enable();
//
//
// //// Get the attribute location
// var uMVMatrix = program.getUniform("uMVMatrix");
// var uPMatrix = program.getUniform("uPMatrix");
// var uTime = program.getUniform("uTime");
//
//
// // Enable the depth test
// gl.enable(gl.DEPTH_TEST);
//
// var DEGREE_RAD = Math.PI / 180;
//
// var mvMatrix = mat4.create();
// var pMatrix = mat4.create();
// var position = vec3.create();
//
//
// mat4.perspective(pMatrix, 45, canvas.width / canvas.height, 0.1, 100.0);
//
//
// //Initialize Model-View matrix
// //mat4.identity(mvMatrix);
// mat4.translate(mvMatrix, mvMatrix, position);
//

//
//
// var interval = new Interval(10).attach((delta:number) => {
//
//
// 	var current = Time.getSafeFromStart() / 100;
// 	//console.log(current, Time.getSafeFromStart());
// 	//quad.vertex[0] = -1 + Math.random()
// 	vec3.set(position, pos.x, pos.y, pos.z);
//
// 	mat4.identity(mvMatrix);
//
//
// 	mat4.rotateX(mvMatrix, mvMatrix, current  * DEGREE_RAD);
// 	mat4.rotateY(mvMatrix, mvMatrix, (current* 10)  * DEGREE_RAD);
// 	mat4.rotateZ(mvMatrix, mvMatrix, (current* 10)  * DEGREE_RAD);
//
// 	mat4.translate(mvMatrix, mvMatrix, position);
//
// 	uMVMatrix.value = mvMatrix;
// 	uPMatrix.value = pMatrix;
// 	uTime.value = current;
//
// 	// Clear the canvas
// 	gl.clearColor(0.0, 0.0, 0.0, 1);
//
// 	// Draw the triangle
// 	gl.drawElements(gl.TRIANGLES, quad.length, gl.UNSIGNED_SHORT,0);
// });