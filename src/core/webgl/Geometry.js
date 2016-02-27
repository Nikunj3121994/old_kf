define(["require", "exports"], function (require, exports) {
    var Geometry = (function () {
        function Geometry(vertex, index) {
            this.vertex = new Float32Array(vertex);
            this.index = new Uint16Array(index);
            this.length = index.length;
        }
        Geometry.createQuad = function () {
            var vertices = [
                -1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,
            ];
            var indices = [0, 1, 2, 0, 2, 3];
            return new Geometry(vertices, indices);
        };
        Geometry.QUAD = Geometry.createQuad();
        return Geometry;
    })();
    exports.Geometry = Geometry;
});
