///<reference path="../lib/gsap/greensock.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../lib/easelts/display/Text', '../lib/easelts/component/BitmapNinePatch', '../lib/easelts/component/bitmapninepatch/NinePatch', '../lib/easelts/geom/Rectangle', '../lib/easelts/behavior/ButtonBehavior'], function (require, exports, Text, BitmapNinePatch, NinePatch, Rectangle, ButtonBehavior) {
    var BottomButton = (function (_super) {
        __extends(BottomButton, _super);
        function BottomButton() {
            _super.call(this, 200, 50, '50%', '100%', '50%', '100%');
            this._ninepatch = new NinePatch('assets/image/ninepatch_blue.png', new Rectangle(5, 12, 139, 8));
            this._bg = new BitmapNinePatch(this._ninepatch);
            this._text = new Text('top');
            this.addBehavior(new ButtonBehavior);
            this.hitArea = this._bg;
            this.addChild(this._bg);
            this.addChild(this._text);
        }
        return BottomButton;
    })(Container);
    return BottomButton;
});
