define(["require", "exports", "../../../src/core/webgl/Shader", "../../../src/core/webgl/ShaderType", "../../../src/core/webgl/ShaderProgram", "../../../src/visual/renderer/element/CanvasWebGL"], function (require, exports, Shader_1, ShaderType_1, ShaderProgram_1, CanvasWebGL_1) {
    var canvas = new CanvasWebGL_1.CanvasWebGL(void 0, 1024, 1024);
    canvas.appendTo(document.body.querySelector('[container="main"]'));
    var gl = canvas.getContext();
    var vertices = [
        -1.0, 1.0, 0.0,
        -1.0, -1.0, 0.0,
        1.0, -1.0, 0.0,
        1.0, 1.0, 0.0
    ];
    var indices = [3, 2, 1, 3, 1, 0];
    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    var Index_Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    var vertex = new Shader_1.default(ShaderType_1.default.VERTEX, "\nattribute vec3 vcoordinates;\nuniform sampler2D texture;\nvarying vec2 tcoordinates;\nvoid main(void) {\n gl_Position = vec4(vcoordinates, 1.0);\n tcoordinates = vec2(vcoordinates.xy);\n}\n");
    var fragment = new Shader_1.default(ShaderType_1.default.FRAGMENT, "\nvarying vec2 tcoordinates;\nvoid main(void) {\n\tgl_FragColor = texture2D(texture, tcoordinates);\n}\n");
    var program = new ShaderProgram_1.default(gl, vertex, fragment);
    program.useProgram();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    var coord = program.getAttribLocation("vcoordinates");
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
        gl.clearColor(0.5, 0.5, 0.5, 0.9);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
        console.log(time());
    };
    setInterval(render, 1000 / 30);
});
