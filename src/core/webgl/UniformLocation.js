define(["require", "exports", "../../visual/display/AbstractTexture"], function (require, exports, AbstractTexture_1) {
    "use strict";
    var UniformLocation = (function () {
        function UniformLocation(gl, name, location, type) {
            this._gl = null;
            this._gl = gl;
            this._name = name;
            this._location = location;
            this._type = type;
        }
        UniformLocation.prototype.getName = function () {
            return this._name;
        };
        UniformLocation.prototype.getType = function () {
            return this._type;
        };
        UniformLocation.prototype.getValue = function () {
            return this._value;
        };
        UniformLocation.prototype.setValue = function (value) {
            var gl = this._gl;
            if (this._value !== value || (this._type != gl.FLOAT && this._type != gl.INT)) {
                this._value = value;
                switch (this._type) {
                    case gl.FLOAT: {
                        gl.uniform1f(this._location, value);
                        break;
                    }
                    case gl.INT: {
                        gl.uniform1i(this._location, value);
                        break;
                    }
                    case gl.FLOAT_VEC2: {
                        gl.uniform2fv(this._location, value);
                        break;
                    }
                    case gl.FLOAT_MAT2: {
                        gl.uniformMatrix2fv(this._location, false, value);
                        break;
                    }
                    case gl.FLOAT_MAT3: {
                        gl.uniformMatrix3fv(this._location, false, value);
                        break;
                    }
                    case gl.FLOAT_MAT4: {
                        gl.uniformMatrix4fv(this._location, false, value);
                        break;
                    }
                    case gl.FLOAT_VEC2: {
                        gl.uniform2fv(this._location, value);
                        break;
                    }
                    case gl.FLOAT_VEC3: {
                        gl.uniform3fv(this._location, value);
                        break;
                    }
                    case gl.FLOAT_VEC4: {
                        gl.uniform4fv(this._location, value);
                        break;
                    }
                    case gl.SAMPLER_2D: {
                        if (value >= 0 && value < 16) {
                            gl.uniform1i(this._location, value);
                        }
                        else if (value instanceof AbstractTexture_1.AbstractTexture) {
                        }
                        break;
                    }
                }
            }
            return this;
        };
        Object.defineProperty(UniformLocation.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UniformLocation.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this.setValue(value);
            },
            enumerable: true,
            configurable: true
        });
        UniformLocation.prototype.activate = function () {
            var value = this._value;
            if (this._type != this._gl.SAMPLER_2D) {
                throw new TypeError('activate can only be triggerd with a sampler2d uniform');
            }
            if (value < 0 || value > 15 || value === void 0) {
                throw new TypeError('value can only be 0 - 15');
            }
            if (value === 0) {
                this._gl.activeTexture(this._gl.TEXTURE0);
            }
            else if (value === 1) {
                this._gl.activeTexture(this._gl.TEXTURE1);
            }
            else if (value === 2) {
                this._gl.activeTexture(this._gl.TEXTURE2);
            }
            else if (value === 3) {
                this._gl.activeTexture(this._gl.TEXTURE3);
            }
            else if (value === 4) {
                this._gl.activeTexture(this._gl.TEXTURE4);
            }
            else if (value === 5) {
                this._gl.activeTexture(this._gl.TEXTURE5);
            }
            else if (value === 6) {
                this._gl.activeTexture(this._gl.TEXTURE6);
            }
            else if (value === 7) {
                this._gl.activeTexture(this._gl.TEXTURE7);
            }
            else if (value === 8) {
                this._gl.activeTexture(this._gl.TEXTURE8);
            }
            else if (value === 9) {
                this._gl.activeTexture(this._gl.TEXTURE9);
            }
            else if (value === 10) {
                this._gl.activeTexture(this._gl.TEXTURE10);
            }
            else if (value === 11) {
                this._gl.activeTexture(this._gl.TEXTURE11);
            }
            else if (value === 12) {
                this._gl.activeTexture(this._gl.TEXTURE12);
            }
            else if (value === 13) {
                this._gl.activeTexture(this._gl.TEXTURE13);
            }
            else if (value === 14) {
                this._gl.activeTexture(this._gl.TEXTURE14);
            }
            else if (value === 15) {
                this._gl.activeTexture(this._gl.TEXTURE15);
            }
        };
        return UniformLocation;
    }());
    exports.UniformLocation = UniformLocation;
});
