import {Mesh} from "../../../src/core/webgl/Mesh";
import {CanvasWebGL} from "../../../src/visual/renderer/element/CanvasWebGL";
import Shader from "../../../src/core/webgl/Shader";
import ShaderType from "../../../src/core/webgl/ShaderType";
import ShaderProgram from "../../../src/core/webgl/ShaderProgram";
import {Texture} from "../../../src/core/webgl/Texture";
import Buffer from "../../../src/core/webgl/Buffer";
import Interval from "../../../src/core/util/Interval";
import Time from "../../../src/core/util/Time";
import DisplayObject from "../../../src/visual/display/DisplayObject";
import {Rectangle} from "../../../src/visual/data/Rectangle";
import ILoadable from "../../../src/core/interface/ILoadable";
import Promise from "../../../src/core/util/Promise";

var canvas = new CanvasWebGL(void 0, 1024, 1024);
canvas.appendTo(document.body.querySelector('[container="main"]'))
var gl = canvas.getContext();


var texture = Texture.createFromUrl(gl, '../uv.jpg');

class Bitmap extends DisplayObject implements ILoadable<Bitmap> {

	source:Texture;
	uv:Float32Array;

	constructor(source:Texture, public rect:Rectangle){
		this.source = <Texture> source;
	}

	public hasLoaded():boolean
	{
		return this.source.hasLoaded();
	}

	public load(onProgress?:(progress:number)=>any):Promise<Bitmap>
	{
		return this.source.load(onProgress).then(() => this );
	}
}

var bmp = new Bitmap(texture, new Rectangle(0, 0, 50, 50));


// Vertex shader source code
var vertex = new Shader(ShaderType.VERTEX, `
attribute vec3 a_position;
attribute vec2 a_texcoord;

varying vec2 v_texcoord;

void main(void) {
 gl_Position = vec4(a_position, 1.0);
 v_texcoord = a_texcoord;
}
`);

var fragment = new Shader(ShaderType.FRAGMENT, `
precision mediump float;
uniform float u_time;
uniform sampler2D u_texture;

varying vec2 v_texcoord;
uniform vec4 color;

void main(void) {
	vec4 color = vec4(sin(u_time) * .5 + .5, cos(u_time) * .5 + .5, sin(u_time*.5) * .5 + .5, 1);
	gl_FragColor = color * texture2D(u_texture, v_texcoord);
}
`);

var quad = Geometry.QUAD;
var program = new ShaderProgram(gl, vertex, fragment).use();

var aPosition = program.defineAttribute("a_position", 3);
aPosition.point(quad).enable();

var uvBuffer = new Buffer(gl, new Float32Array(Texture.getFullUV()));

var aTexcoord = program.defineAttribute("a_texcoord", 2);
aTexcoord.point(uvBuffer).enable();
//

var uTexture = program.getUniform('u_texture').setValue(0);
var uTime = program.getUniform('u_time');

//var sprite new Bitmap()


var interval = new Interval(60).attach((delta:number) => {

	var current = Time.getSafeFromStart() / 1000;

	// Clear the canvas
	gl.clearColor(0.0, 0.0, 0.0, 1);

	// Draw the triangle
	gl.drawElements(gl.TRIANGLES, quad.length, gl.UNSIGNED_SHORT,0);
});