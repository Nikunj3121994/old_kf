import Shader from "../../../src/core/webgl/Shader";
import ShaderType from "../../../src/core/webgl/ShaderType";
import ShaderProgram from "../../../src/core/webgl/ShaderProgram";
import {CanvasWebGL} from "../../../src/visual/renderer/element/CanvasWebGL";
import {Mesh} from "../../../src/core/webgl/Mesh";
import Interval from "../../../src/core/util/Interval";
import Time from "../../../src/core/util/Time";

var canvas = new CanvasWebGL(void 0, 1024, 1024);
canvas.appendTo(document.body.querySelector('[container="main"]'))
var gl = canvas.getContext();

var quad = Mesh.createQuad(gl);
quad.bind();

/*====================== Shaders =======================*/

// Vertex shader source code
var vertex = new Shader(ShaderType.VERTEX, `
attribute vec3 coordinates;
attribute vec2 texCoordinates;
varying vec2 v_texCoordinates;

void main(void) {
 v_texCoordinates = texCoordinates;
 gl_Position = vec4(coordinates, 1.0);
}
`);

var fragment = new Shader(ShaderType.FRAGMENT, `
precision lowp float;
uniform float time;
uniform sampler2D texture;
varying vec2 v_texCoordinates;
void main(void) {
 gl_FragColor = texture2D(texture, v_texCoordinates);
}
`);

var program = new ShaderProgram(gl, vertex, fragment);
program.useProgram();

var uLocations = program.getUniformLocations();


/* ======= Associating shaders to buffer objects =======*/

quad.bind();


// Get the attribute location
var coord = program.getAttribLocation("coordinates");
var texture = program.getAttribLocation("coordinates");

// Point an attribute to the currently bound VBO
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

// Enable the attribute
gl.enableVertexAttribArray(coord);

/*============= Drawing the Quad ================*/

// Enable the depth test
gl.enable(gl.DEPTH_TEST);

var interval = new Interval(60).attach((delta:number, mathdelta:number) => {


	var current = Time.getSafeDelta() / 1000;


	// Clear the canvas
	gl.clearColor(0.0, 0.0, 0.0, 1);
	uLocations.time.setValue(current);

	// Draw the triangle
	gl.drawElements(gl.TRIANGLES, quad.length, gl.UNSIGNED_SHORT,0);
});