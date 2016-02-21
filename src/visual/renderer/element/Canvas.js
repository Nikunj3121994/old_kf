define(["require", "exports", "../../../core/event/Signal2"], function (require, exports, Signal2_1) {
    var Canvas = (function () {
        function Canvas(domElement, width, height) {
            this.onResize = new Signal2_1.default();
            if (!domElement) {
                domElement = document.createElement('canvas');
                if (width == null || height == null) {
                    throw new Error('width and height are required when not providing a HTMLCanvasElement');
                }
            }
            else {
                if (width == null) {
                    width = domElement.width;
                }
                if (height == null) {
                    height = domElement.height;
                }
            }
            this.domElement = domElement;
            this.setSize(width, height);
        }
        Canvas.prototype.appendTo = function (element) {
            element.appendChild(this.domElement);
        };
        Object.defineProperty(Canvas.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this.setWidth(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Canvas.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this.setHeight(value);
            },
            enumerable: true,
            configurable: true
        });
        Canvas.prototype.setSize = function (width, height) {
            this.domElement.width = this._width = width;
            this.domElement.height = this._height = height;
            this.onResize.emit(width, height);
        };
        Canvas.prototype.setHeight = function (value) {
            this.domElement.height = this._height = value;
            this.onResize.emit(this._width, this._height);
        };
        Canvas.prototype.setWidth = function (value) {
            this.domElement.width = this._width = value;
            this.onResize.emit(this._width, this._height);
        };
        Canvas.prototype.getHeight = function () {
            return this._height;
        };
        Canvas.prototype.getWidth = function () {
            return this._width;
        };
        Canvas.prototype.destruct = function () {
            this.domElement = void 0;
            this._width = void 0;
            this._height = void 0;
        };
        return Canvas;
    })();
    exports.Canvas = Canvas;
});
