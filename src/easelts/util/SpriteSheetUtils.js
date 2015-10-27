/*
 * SpriteSheetUtils
 *
 * Copyright (c) 2010 gskinner.com, inc.
 * Copyright (c) 2015 Mient-jan Stelling.
 * Copyright (c) 2015 MediaMonks B.V.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
define(["require", "exports"], function (require, exports) {
    var SpriteSheetUtils = (function () {
        function SpriteSheetUtils() {
            throw "SpriteSheetUtils cannot be instantiated";
        }
        SpriteSheetUtils.addFlippedFrames = function (spriteSheet, horizontal, vertical, both) {
            if (!horizontal && !vertical && !both) {
                return;
            }
            var count = 0;
            if (horizontal) {
                SpriteSheetUtils._flip(spriteSheet, ++count, true, false);
            }
            if (vertical) {
                SpriteSheetUtils._flip(spriteSheet, ++count, false, true);
            }
            if (both) {
                SpriteSheetUtils._flip(spriteSheet, ++count, true, true);
            }
        };
        ;
        SpriteSheetUtils.extractFrame = function (spriteSheet, frameOrAnimation) {
            if (isNaN(frameOrAnimation)) {
                frameOrAnimation = spriteSheet.getAnimation(frameOrAnimation).frames[0];
            }
            var data = spriteSheet.getFrame(frameOrAnimation);
            if (!data) {
                return null;
            }
            var r = data.rect;
            var canvas = SpriteSheetUtils._workingCanvas;
            canvas.width = r.width;
            canvas.height = r.height;
            SpriteSheetUtils._workingContext.drawImage(data.image, r.x, r.y, r.width, r.height, 0, 0, r.width, r.height);
            var img = document.createElement("img");
            img.src = canvas.toDataURL("image/png");
            return img;
        };
        ;
        SpriteSheetUtils.mergeAlpha = function (rgbImage, alphaImage, canvas) {
            if (canvas === void 0) { canvas = document.createElement("canvas"); }
            canvas.width = Math.max(alphaImage.width, rgbImage.width);
            canvas.height = Math.max(alphaImage.height, rgbImage.height);
            var ctx = canvas.getContext("2d");
            ctx.save();
            ctx.drawImage(rgbImage, 0, 0);
            ctx.globalCompositeOperation = "destination-in";
            ctx.drawImage(alphaImage, 0, 0);
            ctx.restore();
            return canvas;
        };
        ;
        SpriteSheetUtils._flip = function (spriteSheet, count, h, v) {
            var imgs = spriteSheet._images;
            var canvas = SpriteSheetUtils._workingCanvas;
            var ctx = SpriteSheetUtils._workingContext;
            var il = imgs.length / count;
            for (var i = 0; i < il; i++) {
                var src = imgs[i];
                src.__tmp = i;
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, canvas.width + 1, canvas.height + 1);
                canvas.width = src.width;
                canvas.height = src.height;
                ctx.setTransform(h ? -1 : 1, 0, 0, v ? -1 : 1, h ? src.width : 0, v ? src.height : 0);
                ctx.drawImage(src, 0, 0);
                var img = document.createElement("img");
                img.src = canvas.toDataURL("image/png");
                img.width = src.width;
                img.height = src.height;
                imgs.push(img);
            }
            var frames = spriteSheet._frames;
            var fl = frames.length / count;
            for (i = 0; i < fl; i++) {
                src = frames[i];
                var rect = src.rect.clone();
                img = imgs[src.image.__tmp + il * count];
                var frame = { image: img, rect: rect, regX: src.regX, regY: src.regY };
                if (h) {
                    rect.x = img.width - rect.x - rect.width;
                    frame.regX = rect.width - src.regX;
                }
                if (v) {
                    rect.y = img.height - rect.y - rect.height;
                    frame.regY = rect.height - src.regY;
                }
                frames.push(frame);
            }
            var sfx = "_" + (h ? "h" : "") + (v ? "v" : "");
            var names = spriteSheet._animations;
            var data = spriteSheet._data;
            var al = names.length / count;
            for (i = 0; i < al; i++) {
                var name = names[i];
                src = data[name];
                var anim = { name: name + sfx, speed: src.speed, next: src.next, frames: [] };
                if (src.next) {
                    anim.next += sfx;
                }
                frames = src.frames;
                for (var j = 0, l = frames.length; j < l; j++) {
                    anim.frames.push(frames[j] + fl * count);
                }
                data[anim.name] = anim;
                names.push(anim.name);
            }
        };
        return SpriteSheetUtils;
    })();
    SpriteSheetUtils['_workingCanvas'] = document.createElement("canvas");
    SpriteSheetUtils['_workingContext'] = SpriteSheetUtils['_workingCanvas'].getContext("2d");
    SpriteSheetUtils['_workingCanvas'].width = SpriteSheetUtils['_workingCanvas'].height = 1;
    exports.default = SpriteSheetUtils;
});
