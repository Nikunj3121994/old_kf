define(["require", "exports", "../../../src/core/webgl/Mesh", "../../../src/visual/renderer/element/CanvasWebGL", "../../../src/core/webgl/Shader", "../../../src/core/webgl/ShaderType", "../../../src/core/webgl/ShaderProgram", "../../../src/core/webgl/Texture", "../../../src/core/webgl/Buffer", "../../../src/core/util/Interval", "../../../src/core/util/Time"], function (require, exports, Mesh_1, CanvasWebGL_1, Shader_1, ShaderType_1, ShaderProgram_1, Texture_1, Buffer_1, Interval_1, Time_1) {
    var canvas = new CanvasWebGL_1.CanvasWebGL(void 0, 1024, 1024);
    canvas.appendTo(document.body.querySelector('[container="main"]'));
    var gl = canvas.getContext();
    var quad = Mesh_1.Mesh.createQuad(gl);
    var vertex = new Shader_1.default(ShaderType_1.default.VERTEX, "\nattribute vec3 a_position;\nattribute vec2 a_texcoord;\n\nvarying vec2 v_texcoord;\n\nvoid main(void) {\n gl_Position = vec4(a_position, 1.0);\n v_texcoord = a_texcoord;\n}\n");
    var fragment = new Shader_1.default(ShaderType_1.default.FRAGMENT, "\nprecision mediump float;\nuniform float u_time;\nuniform sampler2D u_texture;\n\nvarying vec2 v_texcoord;\nuniform vec4 color;\n\nvoid main(void) {\n\tvec4 color = vec4(sin(u_time) * .5 + .5, cos(u_time) * .5 + .5, sin(u_time*.5) * .5 + .5, 1);\n\tgl_FragColor = color * texture2D(u_texture, v_texcoord);\n}\n");
    var program = new ShaderProgram_1.default(gl, vertex, fragment).use();
    var aPosition = program.defineAttribute("a_position", 3);
    aPosition.point(quad).enable();
    var uvBuffer = new Buffer_1.default(gl, new Float32Array(Texture_1.Texture.getFullUV()));
    var aTexcoord = program.defineAttribute("a_texcoord", 2);
    aTexcoord.point(uvBuffer).enable();
    var uTexture = program.getUniform('u_texture').setValue(0);
    var uTime = program.getUniform('u_time');
    var texture = Texture_1.Texture.createFromUrl(gl, '../uv.jpg');
    texture.signalLoad.connect(function () {
        uTexture.activate();
        texture.bind().update();
    });
    gl.enable(gl.DEPTH_TEST);
    var interval = new Interval_1.default(60).attach(function (delta) {
        var current = Time_1.default.getSafeFromStart() / 1000;
        gl.clearColor(0.0, 0.0, 0.0, 1);
        uTime.setValue(current);
        gl.drawElements(gl.TRIANGLES, quad.length, gl.UNSIGNED_SHORT, 0);
    });
});
