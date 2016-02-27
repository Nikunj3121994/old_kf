var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./AbstractTexture", "../../core/event/Signal", "../../core/util/Promise"], function (require, exports, AbstractTexture_1, Signal_1, Promise_1) {
    var Texture = (function (_super) {
        __extends(Texture, _super);
        function Texture(source) {
            var _this = this;
            _super.call(this, source);
            this.width = 0;
            this.height = 0;
            this.onload = new Signal_1.Signal();
            this._hasLoaded = false;
            if (source.nodeName
                && source.tagName.toLowerCase() == 'img') {
                var img = this.source;
                if (!img.complete) {
                    var load = function () {
                        _this._hasLoaded = true;
                        img.removeEventListener('load', load);
                        _this.width = img.naturalWidth;
                        _this.height = img.naturalHeight;
                        _this.onload.emit();
                    };
                    img.addEventListener('load', load);
                }
                else {
                    this._hasLoaded = true;
                    this.width = this.source.width;
                    this.height = this.source.height;
                    setImmediate(function () { return _this.onload.emit(); });
                }
            }
            else {
                this._hasLoaded = true;
                this.width = this.source.width;
                this.height = this.source.height;
                setImmediate(function () { return _this.onload.emit(); });
            }
        }
        Texture.createFromUrl = function (src) {
            var img = document.createElement('img');
            img.src = src;
            return new Texture(img);
        };
        Texture.getFullUV = function () {
            return [
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0
            ];
        };
        Texture.getUVFromRect = function (text, rect) {
            var w = text.width;
            var h = text.height;
            var rx = rect.x;
            var ry = rect.y;
            var rw = rect.width;
            var rh = rect.height;
            return new Float32Array([
                rx / w, ry / h,
                rx / w + rw / w, ry / h,
                rx / w + rw / w, ry / h + rh / h,
                rx / w, ry / h + rh / h
            ]);
        };
        Texture.prototype.hasLoaded = function () {
            return this._hasLoaded;
        };
        Texture.prototype.load = function (onProgress) {
            var _this = this;
            var result;
            if (this.hasLoaded()) {
                if (onProgress) {
                    onProgress(1);
                }
                result = Promise_1.Promise.resolve(this);
            }
            else {
                result = new Promise_1.Promise(function (resolve) {
                    if (_this.hasLoaded()) {
                        if (onProgress) {
                            onProgress(1);
                        }
                        resolve(_this);
                    }
                    else {
                        _this.onload.connect(function () {
                            if (onProgress) {
                                onProgress(1);
                            }
                            resolve(_this);
                        }).once();
                    }
                });
            }
            return result;
        };
        Texture.prototype.getFullUV = function () {
            return Texture.getFullUV();
        };
        return Texture;
    })(AbstractTexture_1.AbstractTexture);
    exports.Texture = Texture;
});
