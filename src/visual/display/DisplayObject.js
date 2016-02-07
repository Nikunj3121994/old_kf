define(["require", "exports", "../../core/util/UID", "../../core/util/Promise", "../geom/Point", "../geom/Matrix2"], function (require, exports, UID_1, Promise_1, Point_1, Matrix2_1) {
    var DisplayObject = (function () {
        function DisplayObject(x, y, regX, regY) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (regX === void 0) { regX = 0; }
            if (regY === void 0) { regY = 0; }
            this.type = 2;
            this.id = UID_1.default.get();
            this.parent = null;
            this.visible = true;
            this.alpha = 1;
            this._bounds = null;
            this._matrix = new Matrix2_1.default();
            this._hasLoaded = false;
            this.x = 0;
            this.y = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.rotation = 0;
            this.skewX = 0;
            this.skewY = 0;
            this.regX = 0;
            this.regY = 0;
            this._off = false;
            this.setTransform(x, y, regX, regY);
        }
        DisplayObject.prototype.hasLoaded = function () {
            return this._hasLoaded;
        };
        DisplayObject.prototype.load = function (onProgress) {
            return Promise_1.default.resolve(this);
        };
        DisplayObject.prototype.updateContext = function (ctx) {
            var mtx, o = this;
            mtx = o._matrix.identity().appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY);
            var tx = mtx.tx, ty = mtx.ty;
        };
        DisplayObject.prototype.localToGlobal = function (x, y) {
            var mtx = this.getConcatenatedMatrix(this._matrix);
            if (mtx == null) {
                return null;
            }
            mtx.append(1, 0, 0, 1, x, y);
            return new Point_1.default(mtx.tx, mtx.ty);
        };
        DisplayObject.prototype.globalToLocal = function (x, y) {
            var mtx = this.getConcatenatedMatrix(this._matrix);
            if (mtx == null) {
                return null;
            }
            mtx.invert();
            mtx.append(1, 0, 0, 1, x, y);
            return new Point_1.default(mtx.tx, mtx.ty);
        };
        DisplayObject.prototype.localToLocal = function (x, y, target) {
            var pt = this.localToGlobal(x, y);
            return target.globalToLocal(pt.x, pt.y);
        };
        DisplayObject.prototype.setTransform = function (x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (scaleX === void 0) { scaleX = 1; }
            if (scaleY === void 0) { scaleY = 1; }
            if (rotation === void 0) { rotation = 0; }
            if (skewX === void 0) { skewX = 0; }
            if (skewY === void 0) { skewY = 0; }
            if (regX === void 0) { regX = 0; }
            if (regY === void 0) { regY = 0; }
            this.x = x;
            this.y = y;
            this.scaleX = scaleX;
            this.scaleY = scaleY;
            this.rotation = rotation;
            this.skewX = skewX;
            this.skewY = skewY;
            this.regX = regX;
            this.regY = regY;
            return this;
        };
        DisplayObject.prototype.getMatrix = function (matrix) {
            var o = this;
            return (matrix ? matrix.identity() : new Matrix2_1.default())
                .appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY)
                .appendProperties(o.alpha, o.shadow, o.compositeOperation, 1);
        };
        DisplayObject.prototype.getConcatenatedMatrix = function (matrix) {
            if (matrix) {
                matrix.identity();
            }
            else {
                matrix = new Matrix2_1.default();
            }
            var o = this;
            while (o != null) {
                matrix.prependTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY).prependProperties(o.alpha, o.shadow, o.compositeOperation, o.visible);
                o = o.parent;
            }
            return matrix;
        };
        DisplayObject.prototype.toString = function () {
            return "[DisplayObject (name=" + this.name + ")]";
        };
        DisplayObject.prototype.onTick = function (delta) {
        };
        DisplayObject.prototype._getBounds = function (matrix, ignoreTransform) {
            return this._transformBounds(this.getBounds(), matrix, ignoreTransform);
        };
        DisplayObject.prototype._transformBounds = function (bounds, matrix, ignoreTransform) {
            if (!bounds) {
                return bounds;
            }
            var x = bounds.x, y = bounds.y, width = bounds.width, height = bounds.height;
            var mtx = ignoreTransform ? this._matrix.identity() : this.getMatrix(this._matrix);
            if (x || y) {
                mtx.appendTransform(0, 0, 1, 1, 0, 0, 0, -x, -y);
            }
            if (matrix) {
                mtx.prependMatrix(matrix);
            }
            var x_a = width * mtx.a, x_b = width * mtx.b;
            var y_c = height * mtx.c, y_d = height * mtx.d;
            var tx = mtx.tx, ty = mtx.ty;
            var minX = tx, maxX = tx, minY = ty, maxY = ty;
            if ((x = x_a + tx) < minX) {
                minX = x;
            }
            else if (x > maxX) {
                maxX = x;
            }
            if ((x = x_a + y_c + tx) < minX) {
                minX = x;
            }
            else if (x > maxX) {
                maxX = x;
            }
            if ((x = y_c + tx) < minX) {
                minX = x;
            }
            else if (x > maxX) {
                maxX = x;
            }
            if ((y = x_b + ty) < minY) {
                minY = y;
            }
            else if (y > maxY) {
                maxY = y;
            }
            if ((y = x_b + y_d + ty) < minY) {
                minY = y;
            }
            else if (y > maxY) {
                maxY = y;
            }
            if ((y = y_d + ty) < minY) {
                minY = y;
            }
            else if (y > maxY) {
                maxY = y;
            }
            return bounds.setProperies(minX, minY, maxX - minX, maxY - minY);
        };
        DisplayObject.prototype.onResize = function (width, height) {
        };
        DisplayObject.prototype.destruct = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.parent = null;
        };
        return DisplayObject;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = DisplayObject;
});
