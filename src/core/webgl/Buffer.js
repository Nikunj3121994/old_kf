define(["require", "exports"], function (require, exports) {
    var Buffer = (function () {
        function Buffer(gl, data, type, usage) {
            this.gl = gl;
            this.data = data;
            this.type = type || gl.ARRAY_BUFFER;
            this.usage = usage || gl.STATIC_DRAW;
            this.buffer = gl.createBuffer();
            gl.bindBuffer(this.type, this.buffer);
            gl.bufferData(this.type, this.data, this.usage);
            gl.bindBuffer(this.type, null);
        }
        Buffer.prototype.bind = function () {
            this.gl.bindBuffer(this.type, this.buffer);
        };
        Buffer.prototype.unbind = function () {
            this.gl.bindBuffer(this.type, null);
        };
        return Buffer;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Buffer;
});
