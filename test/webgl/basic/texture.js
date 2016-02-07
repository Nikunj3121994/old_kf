define(["require", "exports", "../../../src/core/webgl/Shader", "../../../src/core/webgl/ShaderType", "../../../src/core/webgl/ShaderProgram", "../../../src/visual/renderer/element/CanvasWebGL", "../../../src/core/webgl/Mesh", "../../../src/core/util/Interval", "../../../src/core/util/Time", "../../../src/core/webgl/Buffer", "../../../src/core/webgl/Texture"], function (require, exports, Shader_1, ShaderType_1, ShaderProgram_1, CanvasWebGL_1, Mesh_1, Interval_1, Time_1, Buffer_1, Texture_1) {
    var canvas = new CanvasWebGL_1.CanvasWebGL(void 0, 1024, 1024);
    canvas.appendTo(document.body.querySelector('[container="main"]'));
    var gl = canvas.getContext();
    var quad = Mesh_1.Mesh.createQuad(gl);
    var vertex = new Shader_1.default(ShaderType_1.default.VERTEX, "\nattribute vec3 a_position;\nattribute vec2 a_texcoord;\nvarying vec2 v_texcoord;\n\nvoid main(void) {\n gl_Position = vec4(coordinates, 1.0);\n v_textcoord = a_textcoord;\n}\n");
    var fragment = new Shader_1.default(ShaderType_1.default.FRAGMENT, "\nprecision lowp float;\nuniform float time;\n\nuniform sampler2D u_texture;\n\nvoid main(void) {\n\n\tgl_FragColor = texture2D(u_texture, v_texcoord);\n}\n");
    var program = new ShaderProgram_1.default(gl, vertex, fragment).use();
    var uLocations = program.getUniformLocations();
    var text = new Texture_1.Texture(gl);
    var aPosition = program.defineAttribute("a_position", 3);
    aPosition.point(quad).enable();
    var uvBuffer = new Buffer_1.default(gl, new Float32Array([
        0, 0,
        0, 1,
        1, 0,
        0, 1,
        1, 1,
        1, 0
    ]));
    var aTexcoord = program.defineAttribute("a_texcoord", 2);
    aTexcoord.point(uvBuffer).enable();
    gl.enable(gl.DEPTH_TEST);
    var interval = new Interval_1.default(60).attach(function (delta) {
        var current = Time_1.default.getSafeFromStart() / 1000;
        gl.clearColor(0.0, 0.0, 0.0, 1);
        uLocations['time'].setValue(current);
        gl.drawElements(gl.TRIANGLES, quad.length, gl.UNSIGNED_SHORT, 0);
    });
});
