define(["require", "exports", "../../../src/visual/renderer/element/CanvasWebGL", "../../../src/core/webgl/Geometry", "../../../src/core/webgl/ShaderProgram", "../../../src/core/webgl/Buffer", "../../../src/core/webgl/Camera", "../../../src/visual/display/Texture", "../../../src/core/util/PromiseUtil"], function (require, exports, CanvasWebGL_1, Geometry_1, ShaderProgram_1, Buffer_1, Camera_1, Texture_1, PromiseUtil_1) {
    var GUI = dat.GUI;
    var canvas = new CanvasWebGL_1.CanvasWebGL(void 0, 1024, 1024);
    canvas.appendTo(document.body.querySelector('[container="main"]'));
    var gl = canvas.getContext();
    var quad = Geometry_1.Geometry.QUAD;
    var camera = new Camera_1.Camera(canvas);
    var pos = { x: 0, y: 0, z: -2 };
    var gui = new GUI();
    gui.add(pos, 'x', -50, 50);
    gui.add(pos, 'y', -50, 50);
    gui.add(pos, 'z', -50, 50);
    var texture = Texture_1.Texture.createFromUrl('../uv.jpg');
    var program = ShaderProgram_1.ShaderProgram.createFromUrl(gl, "./quad/shader.v.glsl", "./quad/shader.f.glsl");
    PromiseUtil_1.PromiseUtil.loadLoadable([texture, program]).then(function () {
        program.use();
        var uMatrix = program.getUniform("uMatrix");
        var aVertexPosition = program.defineAttribute("aVertexPosition", 3);
        var quadBuffer = new Buffer_1.Buffer(gl, quad).bind();
        aVertexPosition.point().enable();
    });
});
