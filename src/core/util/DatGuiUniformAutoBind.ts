
import {ShaderProgram} from "../webgl/ShaderProgram";
import {UniformLocation} from "../webgl/UniformLocation";

export class DatGuiUniformAutoBind
{
	constructor(public gui:dat.GUI, public program:ShaderProgram)
	{
		var uniforms = this.program.getUniforms();

		Object.keys(uniforms).forEach(name => {
			var uniform:UniformLocation = uniforms[name];

			//uniform.
		})
	}
}

//export class ParamV