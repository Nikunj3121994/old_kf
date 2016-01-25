define(["require", "exports", "../../../src/core/webgl/Shader", "../../../src/core/webgl/ShaderType", "../../../src/core/webgl/ShaderProgram", "../../../src/visual/renderer/element/CanvasWebGL", "../../../src/core/webgl/Mesh"], function (require, exports, Shader_1, ShaderType_1, ShaderProgram_1, CanvasWebGL_1, Mesh_1) {
    var canvas = new CanvasWebGL_1.CanvasWebGL(void 0, 1024, 1024);
    canvas.appendTo(document.body.querySelector('[container="main"]'));
    var gl = canvas.getContext();
    var quad = Mesh_1.Mesh.createQuad();
    quad.initBuffer(gl);
    var vertex = new Shader_1.default(ShaderType_1.default.VERTEX, "\nattribute vec3 coordinates;\n\nvoid main(void) {\n gl_Position = vec4(coordinates, 1.0);\n}\n");
    var fragment = new Shader_1.default(ShaderType_1.default.FRAGMENT, "\nprecision lowp float;\nuniform float time;\nuniform float color;\nvoid main(void) {\n\t//vec3 color = vec3(sin(time)*.5 + .5, cos(time*10.0)*.5 + .5, sin(time)*.5 + .5);\n\tfloat color = sin(time) * .5 + .5;\n\tgl_FragColor = vec4(color, color, color, 1.0);\n}\n");
    var program = new ShaderProgram_1.default(gl, vertex, fragment);
    program.useProgram();
    var uLocations = program.getUniformLocations();
    quad.bindBuffer(gl);
    var coord = program.getAttribLocation("coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    gl.enable(gl.DEPTH_TEST);
    var time = (function () {
        var startTime = 0;
        return function () {
            if (!startTime) {
                startTime = new Date().getTime();
            }
            return new Date().getTime() - startTime;
        };
    })();
    var render = function () {
        var current = time() / 1000;
        gl.clearColor(0.0, 0.0, 0.0, 1);
        uLocations.time.setValue(current);
        gl.drawElements(gl.TRIANGLES, quad.length, gl.UNSIGNED_SHORT, 0);
    };
    setInterval(render, 1000 / 60);
});
