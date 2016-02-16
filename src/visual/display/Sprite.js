define(["require", "exports"], function (require, exports) {
    var Sprite = (function () {
        function Sprite(sheet, uv) {
            if (uv === void 0) { uv = null; }
            _super.call(this, 0, 0);
            this.sheet = sheet;
            this.uv = uv;
        }
        Sprite.prototype.hasLoaded = function () {
            return null;
        };
        return Sprite;
    })();
});
