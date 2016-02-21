define(["require", "exports", "./Shader", "./AttributeLocation", "./UniformLocation", "../util/PromiseUtil", "./ShaderType", "../net/HttpRequest"], function (require, exports, Shader_1, AttributeLocation_1, UniformLocation_1, PromiseUtil_1, ShaderType_1, HttpRequest_1) {
    var ShaderProgram = (function () {
        function ShaderProgram(gl, vertex, fragment) {
            this._isLinked = false;
            this._hasLoaded = false;
            this._uniforms = null;
            this._attributes = {};
            this.gl = gl;
            this._program = gl.createProgram();
            if (typeof vertex == 'string') {
                this._vertex = new Shader_1.Shader(ShaderType_1.default.VERTEX, new HttpRequest_1.HttpRequest(vertex, null));
            }
            else {
                this._vertex = vertex;
            }
            if (typeof fragment == 'string') {
                this._fragment = new Shader_1.Shader(ShaderType_1.default.VERTEX, new HttpRequest_1.HttpRequest(fragment, null));
            }
            else {
                this._fragment = fragment;
            }
            if (this._vertex.hasLoaded() && this._fragment.hasLoaded()) {
                this._hasLoaded = true;
                if (!this._isLinked)
                    this.link();
            }
        }
        ShaderProgram.prototype.hasLoaded = function () {
            return this._hasLoaded;
        };
        ShaderProgram.prototype.load = function (onProgress) {
            var _this = this;
            if (!this._promise) {
                this._program = PromiseUtil_1.PromiseUtil.allForLoadable([this._vertex, this._fragment], onProgress).then(function () {
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
                var gl = this.gl;
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
            this.gl.useProgram(this._program);
            return this;
        };
        ShaderProgram.prototype.get = function () {
            return this._program;
        };
        ShaderProgram.prototype.getParameter = function (parameter) {
            if (this._isLinked)
                this.link();
            return this.gl.getProgramParameter(this._program, parameter);
        };
        ShaderProgram.prototype.getAttribLocation = function (value) {
            if (this._isLinked)
                this.link();
            return this.gl.getAttribLocation(this._program, value);
        };
        ShaderProgram.prototype.defineAttribute = function (name, size, type, normalized, stride, offset) {
            if (type === void 0) { type = this.gl.FLOAT; }
            if (normalized === void 0) { normalized = false; }
            if (stride === void 0) { stride = 0; }
            if (offset === void 0) { offset = 0; }
            if (this._isLinked)
                this.link();
            if (this._attributes[name]) {
                throw new Error('attribute already defined');
            }
            var location = this.getAttribLocation(name);
            this._attributes[name] = new AttributeLocation_1.AttributeLocation(this.gl, location, name, size, type, normalized, stride, offset);
            return this._attributes[name];
        };
        ShaderProgram.prototype.getAttribute = function (name) {
            return this._attributes[name];
        };
        ShaderProgram.prototype.getUniformLocation = function (value) {
            if (this._isLinked)
                this.link();
            return this.gl.getUniformLocation(this._program, value);
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
            var gl = this.gl;
            var n = this.getParameter(gl.ACTIVE_UNIFORMS);
            for (var i = 0; i < n; i++) {
                var info = gl.getActiveUniform(program, i);
                var name = info.name;
                var type = info.type;
                var location = this.getUniformLocation(name);
                uniforms[name] = new UniformLocation_1.UniformLocation(this.gl, name, location, type);
            }
            return uniforms;
        };
        ShaderProgram.prototype.destruct = function () {
            this._vertex = null;
            this._fragment.deleteShader(this.gl);
            this.gl.deleteProgram(this._program);
            this._program = void 0;
            this.gl = void 0;
        };
        return ShaderProgram;
    })();
    exports.ShaderProgram = ShaderProgram;
});
