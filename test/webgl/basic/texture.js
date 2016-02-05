define(["require", "exports", "../../../src/core/webgl/Shader", "../../../src/core/webgl/ShaderType", "../../../src/core/webgl/ShaderProgram", "../../../src/visual/renderer/element/CanvasWebGL", "../../../src/core/webgl/Mesh", "../../../src/core/util/Interval", "../../../src/core/util/Time"], function (require, exports, Shader_1, ShaderType_1, ShaderProgram_1, CanvasWebGL_1, Mesh_1, Interval_1, Time_1) {
    var canvas = new CanvasWebGL_1.CanvasWebGL(void 0, 1024, 1024);
    canvas.appendTo(document.body.querySelector('[container="main"]'));
    var gl = canvas.getContext();
    var quad = Mesh_1.Mesh.createQuad(gl);
    var vertex = new Shader_1.default(ShaderType_1.default.VERTEX, "\nattribute vec3 coordinates;\n\nvoid main(void) {\n gl_Position = vec4(coordinates, 1.0);\n}\n");
    var fragment = new Shader_1.default(ShaderType_1.default.FRAGMENT, "\nprecision lowp float;\nuniform float time;\nuniform float color;\nvoid main(void) {\n\t//vec3 color = vec3(sin(time)*.5 + .5, cos(time*10.0)*.5 + .5, sin(time)*.5 + .5);\n\tvec3 color = vec3(sin(time) * .5 + .5, cos(time) * .5 + .5, sin(time*.5) * .5 + .5);\n\tgl_FragColor = vec4(color, 1.0);\n}\n");
    var program = new ShaderProgram_1.default(gl, vertex, fragment).use();
    var uLocations = program.getUniformLocations();
    var coord = program.defineAttribute("coordinates", 3);
    coord.point(quad).enable();
    gl.enable(gl.DEPTH_TEST);
    var interval = new Interval_1.default(60).attach(function (delta) {
        var current = Time_1.default.getSafeFromStart() / 1000;
        gl.clearColor(0.0, 0.0, 0.0, 1);
        uLocations['time'].setValue(current);
        gl.drawElements(gl.TRIANGLES, quad.length, gl.UNSIGNED_SHORT, 0);
    });
});
