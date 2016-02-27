define(["require", "exports", "./Buffer"], function (require, exports, Buffer_1) {
    "use strict";
    var Mesh = (function () {
        function Mesh(gl, vertex, index) {
            this._gl = gl;
            this.vertex = new Float32Array(vertex);
            this.index = new Uint16Array(index);
            this.length = index.length;
        }
        Mesh.createQuad = function (gl) {
            var vertices = [
                -1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,
            ];
            var indices = [0, 1, 2, 0, 2, 3];
            return new Mesh(gl, vertices, indices);
        };
        Mesh.prototype.bind = function () {
            this.getVertexBuffer().bind();
            this.getIndexBuffer().bind();
        };
        Mesh.prototype.unbind = function () {
            this.getVertexBuffer().unbind();
            this.getIndexBuffer().unbind();
        };
        Mesh.prototype.getVertexBuffer = function () {
            if (!this.vertexBuffer) {
                var gl = this._gl;
                this.vertexBuffer = new Buffer_1.Buffer(gl, this.vertex, gl.ARRAY_BUFFER, gl.STATIC_DRAW);
            }
            return this.vertexBuffer;
        };
        Mesh.prototype.getIndexBuffer = function () {
            if (!this.indexBuffer) {
                var gl = this._gl;
                this.indexBuffer = new Buffer_1.Buffer(gl, this.index, gl.ELEMENT_ARRAY_BUFFER, gl.STATIC_DRAW);
            }
            return this.indexBuffer;
        };
        return Mesh;
    }());
    exports.Mesh = Mesh;
});
