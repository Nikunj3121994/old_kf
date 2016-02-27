define(["require", "exports"], function (require, exports) {
    var AbstractTexture = (function () {
        function AbstractTexture(source) {
            this.id = AbstractTexture.getID();
            this.source = source;
        }
        AbstractTexture.getID = function () {
            return AbstractTexture._id++;
        };
        AbstractTexture.bind = function (gl, texture) {
            gl.bindTexture(gl.TEXTURE_2D, AbstractTexture.getTexture(gl, texture));
        };
        AbstractTexture.unbind = function (gl, texture) {
            gl.bindTexture(gl.TEXTURE_2D, null);
        };
        AbstractTexture.update = function (gl, texture) {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);
            gl.generateMipmap(gl.TEXTURE_2D);
        };
        AbstractTexture.getTexture = function (gl, texture) {
            if (!texture.texture) {
                texture.texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, texture.texture);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.bindTexture(gl.TEXTURE_2D, null);
            }
            return texture.texture;
        };
        AbstractTexture.prototype.isPowerOf2 = function (value) {
            return (value & (value - 1)) == 0;
        };
        AbstractTexture._id = 0;
        return AbstractTexture;
    })();
    exports.AbstractTexture = AbstractTexture;
});
