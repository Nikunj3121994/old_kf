define(["require", "exports"], function (require, exports) {
    var Rectangle = (function () {
        function Rectangle(x, y, width, height) {
            this.x = 0;
            this.y = 0;
            this.w = 0;
            this.h = 0;
            this.setProperies(x, y, width, height);
        }
        Rectangle.prototype.setProperies = function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.w = width;
            this.h = height;
            return this;
        };
        Rectangle.prototype.copy = function (rectangle) {
            return this.setProperies(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
        };
        Rectangle.prototype.clone = function () {
            return new Rectangle(this.x, this.y, this.w, this.h);
        };
        Rectangle.prototype.toString = function () {
            return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.w + " height=" + this.h + ")]";
        };
        return Rectangle;
    })();
    exports.Rectangle = Rectangle;
});
