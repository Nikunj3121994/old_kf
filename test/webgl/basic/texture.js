define(["require", "exports", "../../../src/core/webgl/Shader", "../../../src/core/webgl/ShaderType", "../../../src/core/webgl/ShaderProgram", "../../../src/visual/renderer/element/CanvasWebGL", "../../../src/core/webgl/Mesh", "../../../src/core/util/Interval", "../../../src/core/util/Time"], function (require, exports, Shader_1, ShaderType_1, ShaderProgram_1, CanvasWebGL_1, Mesh_1, Interval_1, Time_1) {
    var canvas = new CanvasWebGL_1.CanvasWebGL(void 0, 1024, 1024);
    canvas.appendTo(document.body.querySelector('[container="main"]'));
    var gl = canvas.getContext();
    var quad = Mesh_1.Mesh.createQuad(gl);
    quad.bind();
    var vertex = new Shader_1.default(ShaderType_1.default.VERTEX, "\nattribute vec3 coordinates;\nattribute vec2 texCoordinates;\nvarying vec2 v_texCoordinates;\n\nvoid main(void) {\n v_texCoordinates = texCoordinates;\n gl_Position = vec4(coordinates, 1.0);\n}\n");
    var fragment = new Shader_1.default(ShaderType_1.default.FRAGMENT, "\nprecision lowp float;\nuniform float time;\nuniform sampler2D texture;\nvarying vec2 v_texCoordinates;\nvoid main(void) {\n gl_FragColor = texture2D(texture, v_texCoordinates);\n}\n");
    var program = new ShaderProgram_1.default(gl, vertex, fragment);
    program.useProgram();
    var uLocations = program.getUniformLocations();
    quad.bind();
    var coord = program.getAttribLocation("coordinates");
    var texture = program.getAttribLocation("coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    gl.enable(gl.DEPTH_TEST);
    var interval = new Interval_1.default(60).attach(function (delta, mathdelta) {
        var current = Time_1.default.getSafeDelta() / 1000;
        gl.clearColor(0.0, 0.0, 0.0, 1);
        uLocations.time.setValue(current);
        gl.drawElements(gl.TRIANGLES, quad.length, gl.UNSIGNED_SHORT, 0);
    });
});
