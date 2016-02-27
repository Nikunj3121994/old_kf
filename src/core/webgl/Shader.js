define(["require", "exports", "./ShaderType", "../../core/net/HttpRequest", "../../core/util/Promise"], function (require, exports, ShaderType_1, HttpRequest_1, Promise_1) {
    "use strict";
    var Shader = (function () {
        function Shader(type, data) {
            this._hasLoaded = false;
            this.type = type;
            if (data && typeof data == 'string') {
                this._hasLoaded = true;
                this._data = data;
            }
            else {
                this._hasLoaded = false;
                this._request = data;
            }
        }
        Shader.createFromUrl = function (type, url) {
            return HttpRequest_1.HttpRequest.getString(url).then(function (data) {
                return new Shader(type, data);
            });
        };
        Shader.prototype.hasLoaded = function () {
            return this._hasLoaded;
        };
        Shader.prototype.load = function (onProgress) {
            var _this = this;
            if (!this._data && !this._request) {
                throw new Error('data has not been set so load has nothing to load.');
            }
            else if (this._data) {
                if (onProgress)
                    onProgress(1);
                return Promise_1.Promise.resolve(this);
            }
            else {
                if (!this._promise) {
                    this._promise = new Promise_1.Promise(function (resolve) {
                        _this._request.load().then(function (data) {
                            _this._hasLoaded = true;
                            _this._data = data;
                            resolve(_this);
                        });
                    });
                }
                return this._promise;
            }
            return null;
        };
        Shader.prototype.getShader = function (gl) {
            if (!this.shader) {
                if (this.type == ShaderType_1.default.FRAGMENT) {
                    this.shader = gl.createShader(gl.FRAGMENT_SHADER);
                }
                else if (this.type == ShaderType_1.default.VERTEX) {
                    this.shader = gl.createShader(gl.VERTEX_SHADER);
                }
                gl.shaderSource(this.shader, this._data);
                gl.compileShader(this.shader);
                if (!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)) {
                    throw new Error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(this.shader));
                }
            }
            return this.shader;
        };
        Shader.prototype.deleteShader = function (gl) {
            if (this.shader) {
                gl.deleteShader(this.shader);
                this.shader = void 0;
            }
        };
        Shader.prototype.toString = function () {
            return this._data;
        };
        Shader.prototype.destruct = function () {
            this._data = void 0;
            this._promise = void 0;
            this._request = void 0;
        };
        return Shader;
    }());
    exports.Shader = Shader;
});
