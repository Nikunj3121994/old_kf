var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../../display/DisplayObject', './FlumpMovieLayer', './FlumpLabelQueueData', '../../data/AnimationQueue', '../../data/Queue'], function (require, exports, DisplayObject_1, FlumpMovieLayer_1, FlumpLabelQueueData_1, AnimationQueue_1, Queue_1) {
    var FlumpMovie = (function (_super) {
        __extends(FlumpMovie, _super);
        function FlumpMovie(flumpLibrary, name, width, height, x, y, regX, regY) {
            if (width === void 0) { width = 1; }
            if (height === void 0) { height = 1; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (regX === void 0) { regX = 0; }
            if (regY === void 0) { regY = 0; }
            _super.call(this, width, height, x, y, regX, regY);
            this._labels = {};
            this._labelQueue = [];
            this._label = null;
            this._queue = null;
            this.hasFrameCallbacks = false;
            this.paused = true;
            this.time = 0.0;
            this.duration = 0.0;
            this.frame = 0;
            this.frames = 0;
            this.speed = 1;
            this.name = name;
            this.flumpLibrary = flumpLibrary;
            this.flumpMovieData = flumpLibrary.getFlumpMovieData(name);
            var layers = this.flumpMovieData.flumpLayerDatas;
            var length = layers.length;
            var movieLayers = new Array(length);
            for (var i = 0; i < length; i++) {
                var layerData = layers[i];
                movieLayers[i] = new FlumpMovieLayer_1.default(this, layerData);
            }
            this.flumpMovieLayers = movieLayers;
            this.frames = this.flumpMovieData.frames;
            this._frameCallback = new Array(this.frames);
            for (var i = 0; i < this.frames; i++) {
                this._frameCallback[i] = null;
            }
            this.duration = (this.frames / flumpLibrary.frameRate) * 1000;
            this._queue = new AnimationQueue_1.default(flumpLibrary.frameRate);
        }
        FlumpMovie.prototype.play = function (times, label, complete) {
            if (times === void 0) { times = 1; }
            if (label === void 0) { label = null; }
            this.visible = true;
            var labelQueueData;
            var queue = null;
            if (label == null || label == '*') {
                labelQueueData = new FlumpLabelQueueData_1.default(label, 0, this.frames, times, 0);
                queue = new Queue_1.default(label, 0, this.frames, times, 0);
            }
            else {
                var queueLabel = this._labels[label];
                if (!queueLabel) {
                    console.warn('unknown label:', queueLabel, 'on', this.name);
                    throw new Error('unknown label:' + queueLabel + ' | ' + this.name);
                }
                labelQueueData = new FlumpLabelQueueData_1.default(queueLabel.label, queueLabel.index, queueLabel.duration, times, 0);
                queue = new Queue_1.default(queueLabel.label, queueLabel.index, queueLabel.duration, times, 0);
            }
            this._labelQueue.push(labelQueueData);
            this._queue.add(queue);
            if (complete) {
                labelQueueData.then(complete);
                queue.then(complete);
            }
            if (!this._label) {
                this.gotoNextLabel();
            }
            this.paused = false;
            return this;
        };
        FlumpMovie.prototype.resume = function () {
            this.paused = false;
            return this;
        };
        FlumpMovie.prototype.pause = function () {
            this.paused = true;
            return this;
        };
        FlumpMovie.prototype.end = function (all) {
            if (all === void 0) { all = false; }
            if (all) {
                this._labelQueue.length = 0;
            }
            if (this._label) {
                this._label.times = 1;
            }
            return this;
        };
        FlumpMovie.prototype.kill = function () {
            this._labelQueue.length = 0;
            this._label = null;
            return this;
        };
        FlumpMovie.prototype.setFrameCallback = function (frameNumber, callback, triggerOnce) {
            var _this = this;
            if (triggerOnce === void 0) { triggerOnce = false; }
            this.hasFrameCallbacks = true;
            if (triggerOnce) {
                this._frameCallback[frameNumber] = function (delta) {
                    callback.call(_this, delta);
                    _this.setFrameCallback(frameNumber, null);
                };
            }
            else {
                this._frameCallback[frameNumber] = callback;
            }
            return this;
        };
        FlumpMovie.prototype.gotoNextLabel = function () {
            if (this._label) {
                this._label.finish();
                this._label.destruct();
            }
            this._label = this._labelQueue.shift();
            this.reset();
            return this._label;
        };
        FlumpMovie.prototype.gotoAndStop = function (frameOrLabel) {
            var frame;
            if (typeof frameOrLabel === 'string') {
                frame = this._labels[frameOrLabel].index;
            }
            else {
                frame = frameOrLabel;
            }
            var label = new FlumpLabelQueueData_1.default(null, frame, 1, 1, 0);
            this._labelQueue.push(label);
            return this;
        };
        FlumpMovie.prototype.stop = function () {
            this.paused = true;
            if (this._label) {
                this._label.finish();
                this._label.destruct();
            }
            return this;
        };
        FlumpMovie.prototype.onTick = function (delta) {
            _super.prototype.onTick.call(this, delta);
            delta *= this.speed;
            if (this.paused == false) {
                this._queue.onTick(delta);
                this.time += delta;
                var label = this._label;
                var fromFrame = this.frame;
                var toFrame = 0;
                if (label) {
                    toFrame = this.frames * this.time / this.duration;
                    if (label.times != -1) {
                        if (toFrame > label.times * label.duration) {
                            if (this._labelQueue.length > 0) {
                                this.gotoNextLabel();
                                label = this._label;
                                toFrame = this.frames * this.time / this.duration;
                            }
                            else {
                                this.stop();
                                return;
                            }
                        }
                    }
                    toFrame = label.index + (toFrame % label.duration);
                    if (this.hasFrameCallbacks) {
                        this.handleFrameCallback(fromFrame, toFrame | 0, delta);
                    }
                }
                else {
                    toFrame = (this.frames * (this.time % this.duration)) / this.duration;
                    if (toFrame < this.frames) {
                        toFrame = toFrame % this.duration;
                    }
                }
                for (var i = 0; i < this.flumpMovieLayers.length; i++) {
                    var layer = this.flumpMovieLayers[i];
                    layer.onTick(delta);
                    layer.setFrame(toFrame);
                }
                this.frame = toFrame;
            }
        };
        FlumpMovie.prototype.handleFrameCallback = function (fromFrame, toFrame, delta) {
            if (toFrame > fromFrame) {
                for (var index = fromFrame; index < toFrame; index++) {
                    if (this._frameCallback[index]) {
                        this._frameCallback[index].call(this, delta);
                    }
                }
            }
            else if (toFrame < fromFrame) {
                for (var index = fromFrame; index < this.frames; index++) {
                    if (this._frameCallback[index]) {
                        this._frameCallback[index].call(this, delta);
                    }
                }
                for (var index = 0; index < toFrame; index++) {
                    if (this._frameCallback[index]) {
                        this._frameCallback[index].call(this, delta);
                    }
                }
            }
            return this;
        };
        FlumpMovie.prototype.setFrame = function (value) {
            var layers = this.flumpMovieLayers;
            var length = layers.length;
            for (var i = 0; i < length; i++) {
                var layer = layers[i];
                if (layer.enabled) {
                    layer.reset();
                    layer.onTick((value / this.frames) * this.duration);
                    layer.setFrame(value);
                }
            }
            return this;
        };
        FlumpMovie.prototype.draw = function (ctx, ignoreCache) {
            var layers = this.flumpMovieLayers;
            var length = layers.length;
            var ga = ctx.globalAlpha;
            for (var i = 0; i < length; i++) {
                var layer = layers[i];
                if (layer.visible && layer.enabled) {
                    ctx.save();
                    ctx.globalAlpha = ga * layer.alpha;
                    ctx.transform(layer._storedMtx.a, layer._storedMtx.b, layer._storedMtx.c, layer._storedMtx.d, layer._storedMtx.tx, layer._storedMtx.ty);
                    layer.draw(ctx);
                    ctx.restore();
                }
            }
            return true;
        };
        FlumpMovie.prototype.reset = function () {
            this.frame = 0;
            this.time = 0.0;
            for (var i = 0; i < this.flumpMovieLayers.length; i++) {
                var layer = this.flumpMovieLayers[i];
                layer.reset();
                for (var symbol in layer._symbols) {
                    layer._symbols[symbol].reset();
                }
            }
        };
        return FlumpMovie;
    })(DisplayObject_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = FlumpMovie;
});
