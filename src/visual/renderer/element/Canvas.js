define(["require", "exports"], function (require, exports) {
    var Canvas = (function () {
        function Canvas(domElement, width, height) {
            if (domElement === void 0) { domElement = document.createElement('canvas'); }
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
            this.setWidth(width);
            this.setHeight(height);
        };
        Canvas.prototype.setHeight = function (value) {
            this.domElement.height = this._height = value;
        };
        Canvas.prototype.setWidth = function (value) {
            this.domElement.width = this._width = value;
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
