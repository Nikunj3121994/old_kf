var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Canvas", "../../data/Rectangle"], function (require, exports, Canvas_1, Rectangle_1) {
    var Canvas2d = (function (_super) {
        __extends(Canvas2d, _super);
        function Canvas2d() {
            _super.apply(this, arguments);
            this._quality = 0;
            this.clearColor = null;
        }
        Canvas2d.prototype.setHeight = function (value) {
            _super.prototype.setHeight.call(this, value);
            this.setQuality(this._quality);
        };
        Canvas2d.prototype.setWidth = function (value) {
            _super.prototype.setWidth.call(this, value);
            this.setQuality(this._quality);
        };
        Canvas2d.prototype.draw = function (ctx, ignoreCache) {
            var w = this._width, h = this._height;
            ctx.drawImage(this.domElement, 0, 0, w, h, 0, 0, w, h);
        };
        Canvas2d.prototype.reset = function () {
            this.getContext().setTransform(1, 0, 0, 1, 0, 0);
            this.clear();
        };
        Canvas2d.prototype.clear = function () {
            var context = this.getContext(), width = this._width, height = this._height;
            if (!this.clearColor) {
                context.clearRect(0, 0, width, height);
            }
            else {
                context.fillStyle = this.clearColor;
                context.fillRect(0, 0, width, height);
            }
        };
        Canvas2d.prototype.toDataURL = function (backgroundColor, mimeType, quality) {
            if (mimeType === void 0) { mimeType = "image/png"; }
            if (quality === void 0) { quality = 1.0; }
            var ctx = this.getContext();
            var w = this.width;
            var h = this.height;
            var data;
            if (backgroundColor) {
                data = ctx.getImageData(0, 0, w, h);
                var compositeOperation = ctx.globalCompositeOperation;
                ctx.globalCompositeOperation = "destination-over";
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(0, 0, w, h);
            }
            var dataURL = this.domElement.toDataURL(mimeType, quality);
            if (backgroundColor) {
                ctx.clearRect(0, 0, w + 1, h + 1);
                ctx.putImageData(data, 0, 0);
                ctx.globalCompositeOperation = compositeOperation;
            }
            return dataURL;
        };
        Canvas2d.prototype.getImageData = function (x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = this._width; }
            if (height === void 0) { height = this._height; }
            return this._context.getImageData(x, y, width, height);
        };
        Canvas2d.prototype.getDrawBounds = function () {
            var width = Math.ceil(this.width);
            var height = Math.ceil(this.height);
            var pixels = this.getImageData();
            var data = pixels.data, x0 = width, y0 = height, x1 = 0, y1 = 0;
            for (var i = 3, l = data.length, p = 0; i < l; i += 4, ++p) {
                var px = p % width;
                var py = Math.floor(p / width);
                if (data[i - 3] > 0 ||
                    data[i - 2] > 0 ||
                    data[i - 1] > 0 ||
                    data[i] > 0) {
                    x0 = Math.min(x0, px);
                    y0 = Math.min(y0, py);
                    x1 = Math.max(x1, px);
                    y1 = Math.max(y1, py);
                }
            }
            return new Rectangle_1.Rectangle(x0, y0, x1 - x0, y1 - y0);
        };
        Canvas2d.prototype.getContext = function () {
            if (!this._context) {
                this._context = this.domElement.getContext('2d');
            }
            return this._context;
        };
        Canvas2d.prototype.setQuality = function (name) {
            var ctx = this.getContext();
            switch (name) {
                case 1:
                    {
                        this._quality = name;
                        ctx['mozImageSmoothingEnabled'] = false;
                        ctx['webkitImageSmoothingEnabled'] = false;
                        ctx['msImageSmoothingEnabled'] = false;
                        ctx['imageSmoothingEnabled'] = false;
                        break;
                    }
                case 0:
                    {
                        this._quality = name;
                        ctx['mozImageSmoothingEnabled'] = true;
                        ctx['webkitImageSmoothingEnabled'] = true;
                        ctx['msImageSmoothingEnabled'] = true;
                        ctx['imageSmoothingEnabled'] = true;
                        break;
                    }
            }
        };
        return Canvas2d;
    })(Canvas_1.Canvas);
    exports.Canvas2d = Canvas2d;
});
