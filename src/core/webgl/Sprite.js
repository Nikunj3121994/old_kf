var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../visual/display/DisplayObject"], function (require, exports, DisplayObject_1) {
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite(sheet, uv) {
            if (uv === void 0) { uv = null; }
            _super.call(this);
            this.sheet = sheet;
            this.uv = uv;
        }
        Sprite.prototype.hasLoaded = function () {
            return null;
        };
        return Sprite;
    })(DisplayObject_1.default);
});
