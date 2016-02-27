define(["require", "exports", "./Geometry"], function (require, exports, Geometry_1) {
    var Buffer = (function () {
        function Buffer(gl, data, type, usage) {
            this._buffers = null;
            this.hasGeometry = false;
            this.hasPassed = false;
            this.gl = gl;
            if (data instanceof Geometry_1.Geometry) {
                this.hasGeometry = true;
                this._buffers = [];
                var vbuffer = new Buffer(gl, data.vertex, gl.ARRAY_BUFFER, usage);
                var ibuffer = new Buffer(gl, data.index, gl.ELEMENT_ARRAY_BUFFER, usage);
                this._buffers.push(vbuffer);
                this._buffers.push(ibuffer);
            }
            else {
                this.data = data;
                this.type = type || gl.ARRAY_BUFFER;
                this.usage = usage || gl.STATIC_DRAW;
                this.buffer = gl.createBuffer();
            }
        }
        Buffer.prototype.update = function () {
            if (!this.hasGeometry) {
                this.gl.bindBuffer(this.type, this.buffer);
                this.gl.bufferData(this.type, this.data, this.usage);
                this.gl.bindBuffer(this.type, null);
            }
            else {
                this._buffers[0].update();
                this._buffers[1].update();
            }
            this.hasPassed = true;
            return this;
        };
        Buffer.prototype.updateBind = function () {
            if (!this.hasGeometry) {
                this.gl.bindBuffer(this.type, this.buffer);
                this.gl.bufferData(this.type, this.data, this.usage);
            }
            else {
                this._buffers[0].updateBind();
                this._buffers[1].updateBind();
            }
            this.hasPassed = true;
            return this;
        };
        Buffer.prototype.bind = function () {
            if (!this.hasPassed) {
                this.updateBind();
            }
            else {
                if (!this.hasGeometry) {
                    this.gl.bindBuffer(this.type, this.buffer);
                }
                else {
                    this._buffers[0].bind();
                    this._buffers[1].bind();
                }
            }
            return this;
        };
        Buffer.prototype.unbind = function () {
            if (!this.hasGeometry) {
                this.gl.bindBuffer(this.type, null);
            }
            else {
                this._buffers[0].unbind();
                this._buffers[1].unbind();
            }
            return this;
        };
        return Buffer;
    })();
    exports.Buffer = Buffer;
});
