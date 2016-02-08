var AbstractTexture = (function () {
    function AbstractTexture(gl, source) {
        this.gl = gl;
        this.source = source;
    }
    AbstractTexture.prototype.getTexture = function () {
        if (!this.texture) {
            var gl = this.gl;
            var texture = this.texture = gl.createTexture();
            this.bind();
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            this.unbind();
        }
        return this.texture;
    };
    AbstractTexture.prototype.isPowerOf2 = function (value) {
        return (value & (value - 1)) == 0;
    };
    AbstractTexture.prototype.bind = function () {
        var gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        return this;
    };
    AbstractTexture.prototype.unbind = function () {
        var gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, null);
        return this;
    };
    AbstractTexture.prototype.update = function () {
        var gl = this.gl;
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.source);
        return this;
    };
    return AbstractTexture;
})();
