define(["require", "exports", "./UniformLocation", "./AttributeLocation"], function (require, exports, UniformLocation_1, AttributeLocation_1) {
    var ShaderProgram = (function () {
        function ShaderProgram(gl, vertex, fragment) {
            this._uniforms = null;
            this._attributes = {};
            this.gl = gl;
            this.program = gl.createProgram();
            gl.attachShader(this.program, vertex.getShader(gl));
            gl.attachShader(this.program, fragment.getShader(gl));
            gl.linkProgram(this.program);
            if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
                alert("Unable to initialize the shader program.");
            }
        }
        ShaderProgram.createGuiItems = function (gui, program) {
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
        ShaderProgram.prototype.use = function () {
            this.gl.useProgram(this.program);
            return this;
        };
        ShaderProgram.prototype.get = function () {
            return this.program;
        };
        ShaderProgram.prototype.getParameter = function (parameter) {
            return this.gl.getProgramParameter(this.program, parameter);
        };
        ShaderProgram.prototype.getAttribLocation = function (value) {
            return this.gl.getAttribLocation(this.program, value);
        };
        ShaderProgram.prototype.defineAttribute = function (name, size, type, normalized, stride, offset) {
            if (type === void 0) { type = this.gl.FLOAT; }
            if (normalized === void 0) { normalized = false; }
            if (stride === void 0) { stride = 0; }
            if (offset === void 0) { offset = 0; }
            if (this._attributes[name]) {
                throw new Error('attribute already defined');
            }
            var location = this.getAttribLocation(name);
            this._attributes[name] = new AttributeLocation_1.default(this.gl, location, name, size, type, normalized, stride, offset);
            return this._attributes[name];
        };
        ShaderProgram.prototype.getAttribute = function (name) {
            return this._attributes[name];
        };
        ShaderProgram.prototype.getUniformLocation = function (value) {
            return this.gl.getUniformLocation(this.program, value);
        };
        ShaderProgram.prototype.getUniforms = function () {
            if (!this._uniforms) {
                this._uniforms = this.fetchUniformLocations();
            }
            return this._uniforms;
        };
        ShaderProgram.prototype.getUniform = function (name) {
            return this.getUniforms()[name];
        };
        ShaderProgram.prototype.fetchUniformLocations = function () {
            var uniforms = {};
            var program = this.program;
            var gl = this.gl;
            var n = this.getParameter(gl.ACTIVE_UNIFORMS);
            for (var i = 0; i < n; i++) {
                var info = gl.getActiveUniform(program, i);
                var name = info.name;
                var type = info.type;
                var location = this.getUniformLocation(name);
                uniforms[name] = new UniformLocation_1.default(this.gl, name, location, type);
            }
            return uniforms;
        };
        ShaderProgram.prototype.destruct = function () {
            this.gl.deleteProgram(this.program);
            this.program = void 0;
            this.gl = void 0;
        };
        return ShaderProgram;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ShaderProgram;
});
