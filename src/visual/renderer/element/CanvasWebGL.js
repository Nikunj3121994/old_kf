var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Canvas"], function (require, exports, Canvas_1) {
    var CanvasWebGL = (function (_super) {
        __extends(CanvasWebGL, _super);
        function CanvasWebGL() {
            _super.apply(this, arguments);
        }
        CanvasWebGL.prototype.updateViewport = function () {
            var gl = this.getContext();
            gl.viewport(0, 0, this._width | 0, this._height | 0);
        };
        CanvasWebGL.prototype.getContext = function () {
            if (!this._gl) {
                var gl = null;
                var canvas = this.domElement;
                try {
                    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
                }
                catch (e) { }
                if (!gl) {
                    alert("Unable to initialize WebGL. Your browser may not support it.");
                    gl = null;
                }
                this._gl = gl;
            }
            return this._gl;
        };
        CanvasWebGL.prototype.setHeight = function (value) {
            _super.prototype.setHeight.call(this, value);
            this.updateViewport();
        };
        CanvasWebGL.prototype.setWidth = function (value) {
            _super.prototype.setWidth.call(this, value);
            this.updateViewport();
        };
        CanvasWebGL.prototype.clear = function () {
            this._gl.clear(this._gl.COLOR_BUFFER_BIT);
        };
        CanvasWebGL.prototype.destruct = function () {
            this._gl = null;
            this.domElement = null;
        };
        return CanvasWebGL;
    })(Canvas_1.Canvas);
    exports.CanvasWebGL = CanvasWebGL;
});
