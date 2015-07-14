define(["require", "exports"], function (require, exports) {
    var FlumpTexture = (function () {
        function FlumpTexture(renderTexture, json) {
            this.renderTexture = renderTexture;
            this.originX = json.origin[0];
            this.originY = json.origin[1];
            this.x = json.rect[0];
            this.y = json.rect[1];
            this.width = json.rect[2];
            this.height = json.rect[3];
        }
        FlumpTexture.prototype.draw = function (ctx) {
            ctx.drawImage(this.renderTexture, this.x, this.y, this.width, this.height, this.originX, this.originY, this.width, this.height);
            return true;
        };
        return FlumpTexture;
    })();
    return FlumpTexture;
});
