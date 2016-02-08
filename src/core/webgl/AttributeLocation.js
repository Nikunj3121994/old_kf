define(["require", "exports", "./Mesh"], function (require, exports, Mesh_1) {
    var AttributeLocation = (function () {
        function AttributeLocation(gl, location, name, size, type, normalized, stride, offset) {
            if (type === void 0) { type = gl.FLOAT; }
            if (normalized === void 0) { normalized = false; }
            if (stride === void 0) { stride = 0; }
            if (offset === void 0) { offset = 0; }
            this._gl = null;
            this._gl = gl;
            this._name = name;
            this._location = location;
            this._size = size;
            this._type = type;
            this._normalized = normalized;
            this._stride = stride;
            this._offset = offset;
        }
        AttributeLocation.prototype.point = function () {
            var buffers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                buffers[_i - 0] = arguments[_i];
            }
            if (buffers.length > 0) {
                if (buffers[0] instanceof Mesh_1.Mesh) {
                    if (buffers.length > 1) {
                        throw new Error('a attribute location can only point to one buffer');
                    }
                    var buffer = buffers[0];
                    buffer.getVertexBuffer().bind();
                    buffer.getIndexBuffer().bind();
                }
                else {
                    for (var i = 0; i < buffers.length; i++) {
                        var buffer = buffers[i];
                        buffer.bind();
                    }
                }
            }
            this._gl.vertexAttribPointer(this._location, this._size, this._type, this._normalized, this._stride, this._offset);
            return this;
        };
        AttributeLocation.prototype.enable = function () {
            this._gl.enableVertexAttribArray(this._location);
        };
        return AttributeLocation;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = AttributeLocation;
});
