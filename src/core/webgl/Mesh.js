define(["require", "exports", "./Buffer"], function (require, exports, Buffer_1) {
    var Mesh = (function () {
        function Mesh(gl, vertex, index) {
            this._gl = gl;
            this.vertex = new Float32Array(vertex);
            this.index = new Uint16Array(index);
            this.length = index.length;
        }
        Mesh.createQuad = function (gl) {
            var vertices = [
                -1.0, 1.0, 0.0,
                -1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0, 1.0, 0.0
            ];
            var indices = [3, 2, 1, 3, 1, 0];
            return new Mesh(gl, vertices, indices);
        };
        Mesh.prototype.bind = function () {
            var gl = this._gl;
            if (!this.vertexBuffer) {
                this.vertexBuffer = new Buffer_1.default(gl, this.vertex, gl.ARRAY_BUFFER, gl.STATIC_DRAW);
            }
            if (!this.indexBuffer) {
                this.indexBuffer = new Buffer_1.default(gl, this.index, gl.ELEMENT_ARRAY_BUFFER, gl.STATIC_DRAW);
            }
            this.vertexBuffer.bind();
            this.indexBuffer.bind();
        };
        Mesh.prototype.unbind = function () {
            this.vertexBuffer.unbind();
            this.indexBuffer.unbind();
        };
        return Mesh;
    })();
    exports.Mesh = Mesh;
});
