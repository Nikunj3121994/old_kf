define(["require", "exports"], function (require, exports) {
    "use strict";
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
        AttributeLocation.prototype.point2 = function () {
            var buffers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                buffers[_i - 0] = arguments[_i];
            }
            return this;
        };
        AttributeLocation.prototype.point = function () {
            this._gl.vertexAttribPointer(this._location, this._size, this._type, this._normalized, this._stride, this._offset);
            return this;
        };
        AttributeLocation.prototype.enable = function () {
            this._gl.enableVertexAttribArray(this._location);
        };
        return AttributeLocation;
    }());
    exports.AttributeLocation = AttributeLocation;
});
