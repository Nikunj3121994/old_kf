define(["require", "exports", "./ShaderProgram"], function (require, exports, ShaderProgram_1) {
    var WebGL = (function () {
        function WebGL(element) {
            this.el = element;
            this.gl = element.getContext();
        }
        WebGL.prototype.createProgram = function (vertex, fragment) {
            return new ShaderProgram_1.ShaderProgram(this.gl, vertex, fragment);
        };
        return WebGL;
    })();
    exports.WebGL = WebGL;
});
