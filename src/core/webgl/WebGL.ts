import {CanvasWebGL} from "../../visual/renderer/element/CanvasWebGL";
import {ShaderProgram} from "./ShaderProgram";
import {Shader} from "./Shader";

export class WebGL {

	el:CanvasWebGL;
	gl:WebGLRenderingContext;

	constructor(element:CanvasWebGL){
		this.el = element;
		this.gl = element.getContext();
	}

	public createProgram(vertex:Shader, fragment:Shader):ShaderProgram
	{
		return new ShaderProgram(this.gl, vertex, fragment);
	}
}