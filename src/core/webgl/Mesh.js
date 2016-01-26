define(["require", "exports"], function (require, exports) {
    var Mesh = (function () {
        function Mesh(vertex, index) {
            this.vertex = new Float32Array(vertex);
            this.index = new Uint16Array(index);
            this.length = this.index.length;
        }
        Mesh.createQuad = function (gl) {
            var vertices = [
                -1.0, 1.0, 0.0,
                -1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0, 1.0, 0.0
            ];
            var indices = [3, 2, 1, 3, 1, 0];
            return new Mesh(vertices, indices);
        };
        Mesh.prototype.initBuffer = function (gl) {
            if (!this.vertexBuffer) {
                this.vertexBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, this.vertex, gl.STATIC_DRAW);
                gl.bindBuffer(gl.ARRAY_BUFFER, null);
            }
            if (!this.indexBuffer) {
                this.indexBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.index, gl.STATIC_DRAW);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            }
            return this;
        };
        Mesh.prototype.bindBuffer = function (gl) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        };
        Mesh.prototype.unbindBuffer = function (gl) {
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        };
        return Mesh;
    })();
    exports.Mesh = Mesh;
});
