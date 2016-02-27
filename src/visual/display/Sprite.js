define(["require", "exports"], function (require, exports) {
    "use strict";
    var Sprite = (function () {
        function Sprite(sheet, rectangle) {
            this.texture = sheet;
            this.rectangle = rectangle;
        }
        Sprite.prototype.hasLoaded = function () {
            return null;
        };
        return Sprite;
    }());
    exports.Sprite = Sprite;
});
