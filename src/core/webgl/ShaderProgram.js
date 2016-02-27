define(["require", "exports", "./Shader", "./AttributeLocation", "./UniformLocation", "../util/PromiseUtil", "./ShaderType", "../net/HttpRequest"], function (require, exports, Shader_1, AttributeLocation_1, UniformLocation_1, PromiseUtil_1, ShaderType_1, HttpRequest_1) {
    "use strict";
    var ShaderProgram = (function () {
        function ShaderProgram(gl, vertex, fragment) {
            this._isLinked = false;
            this._hasLoaded = false;
            this._uniforms = null;
            this._attributes = {};
            this._gl = gl;
            this._program = gl.createProgram();
            this._vertex = vertex;
            this._fragment = fragment;
            if (this._vertex.hasLoaded() && this._fragment.hasLoaded()) {
                this._hasLoaded = true;
                if (!this._isLinked)
                    this.link();
            }
        }
        ShaderProgram.createFromUrl = function (gl, vertexUrl, fragmentUrl) {
            return new ShaderProgram(gl, new Shader_1.Shader(ShaderType_1.default.VERTEX, new HttpRequest_1.HttpRequest(vertexUrl, null)), new Shader_1.Shader(ShaderType_1.default.FRAGMENT, new HttpRequest_1.HttpRequest(fragmentUrl, null)));
        };
        ShaderProgram.prototype.hasLoaded = function () {
            return this._hasLoaded;
        };
        ShaderProgram.prototype.load = function (onProgress) {
            var _this = this;
            if (!this._promise) {
                this._program = PromiseUtil_1.PromiseUtil.loadLoadable([this._vertex, this._fragment], onProgress).then(function () {
                    _this.link();
                    return _this;
                });
            }
            return this._promise;
        };
        Object.defineProperty(ShaderProgram.prototype, "attributes", {
            get: function () {
                return this._attributes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShaderProgram.prototype, "uniforms", {
            get: function () {
                return this.getUniforms();
            },
            enumerable: true,
            configurable: true
        });
        ShaderProgram.prototype.link = function () {
            if (!this._isLinked) {
                var gl = this._gl;
                gl.attachShader(this._program, this._vertex.getShader(gl));
                gl.attachShader(this._program, this._fragment.getShader(gl));
                gl.linkProgram(this._program);
                this._vertex.deleteShader(gl);
                this._fragment.deleteShader(gl);
                this._vertex = null;
                this._fragment = null;
                if (!gl.getProgramParameter(this._program, gl.LINK_STATUS)) {
                    alert("Unable to initialize the shader program.");
                    throw new Error("Unable to initialize the shader program.");
                }
                this._isLinked = true;
            }
            return this;
        };
        ShaderProgram.prototype.use = function () {
            if (!this._isLinked)
                this.link();
            if (!this.hasLoaded()) {
                throw new Error('can not use program when shaders are not loaded yet');
            }
            this._gl.useProgram(this._program);
            return this;
        };
        ShaderProgram.prototype.get = function () {
            return this._program;
        };
        ShaderProgram.prototype.getParameter = function (parameter) {
            if (this._isLinked)
                this.link();
            return this._gl.getProgramParameter(this._program, parameter);
        };
        ShaderProgram.prototype.getAttribLocation = function (value) {
            if (this._isLinked)
                this.link();
            return this._gl.getAttribLocation(this._program, value);
        };
        ShaderProgram.prototype.defineAttribute = function (name, size, type, normalized, stride, offset) {
            if (type === void 0) { type = this._gl.FLOAT; }
            if (normalized === void 0) { normalized = false; }
            if (stride === void 0) { stride = 0; }
            if (offset === void 0) { offset = 0; }
            if (this._isLinked)
                this.link();
            if (this._attributes[name]) {
                throw new Error('attribute already defined');
            }
            var location = this.getAttribLocation(name);
            this._attributes[name] = new AttributeLocation_1.AttributeLocation(this._gl, location, name, size, type, normalized, stride, offset);
            return this._attributes[name];
        };
        ShaderProgram.prototype.getAttribute = function (name) {
            return this._attributes[name];
        };
        ShaderProgram.prototype.getUniformLocation = function (value) {
            if (this._isLinked)
                this.link();
            return this._gl.getUniformLocation(this._program, value);
        };
        ShaderProgram.prototype.getUniforms = function () {
            if (!this._uniforms) {
                if (this._isLinked)
                    this.link();
                this._uniforms = this.fetchUniformLocations();
            }
            return this._uniforms;
        };
        ShaderProgram.prototype.getUniform = function (name) {
            return this.getUniforms()[name];
        };
        ShaderProgram.prototype.fetchUniformLocations = function () {
            var uniforms = {};
            var program = this._program;
            var gl = this._gl;
            var n = this.getParameter(gl.ACTIVE_UNIFORMS);
            for (var i = 0; i < n; i++) {
                var info = gl.getActiveUniform(program, i);
                var name = info.name;
                var type = info.type;
                var location = this.getUniformLocation(name);
                uniforms[name] = new UniformLocation_1.UniformLocation(this._gl, name, location, type);
            }
            return uniforms;
        };
        ShaderProgram.prototype.destruct = function () {
            this._vertex = null;
            this._fragment.deleteShader(this._gl);
            this._gl.deleteProgram(this._program);
            this._program = void 0;
            this._gl = void 0;
        };
        return ShaderProgram;
    }());
    exports.ShaderProgram = ShaderProgram;
});
