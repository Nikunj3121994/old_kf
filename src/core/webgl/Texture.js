var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./AbstractTexture", "../event/Signal"], function (require, exports, AbstractTexture_1, Signal_1) {
    var Texture = (function (_super) {
        __extends(Texture, _super);
        function Texture(gl, source) {
            var _this = this;
            _super.call(this, gl, source);
            this.width = 0;
            this.height = 0;
            this.signalLoad = new Signal_1.Signal();
            this._hasLoaded = false;
            if (source.nodeName
                && source.tagName.toLowerCase() == 'img') {
                var img = this.source;
                if (!img.complete) {
                    var load = function () {
                        img.removeEventListener('load', load);
                        _this.width = img.naturalWidth;
                        _this.height = img.naturalHeight;
                        _this._hasLoaded = true;
                        _this.signalLoad.emit();
                    };
                    img.addEventListener('load', load);
                }
                else {
                    this.width = this.source.width;
                    this.height = this.source.height;
                    this._hasLoaded = true;
                    setImmediate(function () { return _this.signalLoad.emit(); });
                }
            }
            else {
                this.width = this.source.width;
                this.height = this.source.height;
                this._hasLoaded = true;
                setImmediate(function () { return _this.signalLoad.emit(); });
            }
        }
        Texture.createFromUrl = function (gl, src) {
            var img = document.createElement('img');
            img.src = src;
            return new Texture(gl, img);
        };
        Texture.getFullUV = function () {
            return [
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0
            ];
        };
        Texture.prototype.hasLoaded = function () {
            return this._hasLoaded;
        };
        Texture.prototype.getUVFromRect = function (rect) {
            var width = this.width;
            var height = this.height;
            var f = [rect.x / width, rect.y / height, rect.w / width, rect.h / height];
            return [
                f[0], f[1],
                f[0] + f[2], f[1],
                f[0] + f[2], f[1] + f[3],
                f[0] + f[2], f[1]
            ];
        };
        Texture.prototype.getFullUV = function () {
            return Texture.getFullUV();
        };
        return Texture;
    })(AbstractTexture_1.AbstractTexture);
    exports.Texture = Texture;
});
