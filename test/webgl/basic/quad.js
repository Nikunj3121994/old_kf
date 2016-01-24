define(["require", "exports", "../../../src/core/webgl/Shader", "../../../src/core/webgl/ShaderType", "../../../src/core/webgl/ShaderProgram", "../../../src/visual/renderer/element/CanvasWebGL", "../../../src/core/webgl/Mesh"], function (require, exports, Shader_1, ShaderType_1, ShaderProgram_1, CanvasWebGL_1, Mesh_1) {
    var canvas = new CanvasWebGL_1.CanvasWebGL(void 0, 1024, 1024);
    canvas.appendTo(document.body.querySelector('[container="main"]'));
    var gl = canvas.getContext();
    var quad = Mesh_1.Mesh.createQuad();
    quad.initBuffer(gl);
    var vertex = new Shader_1.default(ShaderType_1.default.VERTEX, "\nattribute vec3 coordinates;\n\nvoid main(void) {\n gl_Position = vec4(coordinates, 1.0);\n}\n");
    var fragment = new Shader_1.default(ShaderType_1.default.FRAGMENT, "\nprecision mediump float;\nuniform float time;\nvoid main(void) {\n\tgl_FragColor = vec4(sin(time), sin(time), sin(time), 1);\n}\n");
    var program = new ShaderProgram_1.default(gl, vertex, fragment);
    program.useProgram();
    var uLocations = program.getUniformLocations();
    quad.bindBuffer(gl);
    var coord = program.getAttribLocation("coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    gl.enable(gl.DEPTH_TEST);
    var time = (function () {
        var prev = 0;
        return function () {
            var current = new Date().getTime();
            if (prev == 0) {
                prev = current;
            }
            var ntime = current;
            prev = current;
            return ntime / 1000 | 0;
        };
    })();
    var render = function () {
        uLocations.time.value = new Date().getTime() / 1000;
        gl.clearColor(0.0, 0.0, 0.0, 1);
        gl.drawElements(gl.TRIANGLES, quad.length, gl.UNSIGNED_SHORT, 0);
    };
    setInterval(render, 1000 / 60);
});
