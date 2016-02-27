define(["require", "exports", "../../vendor/gl-matrix/gl-matrix"], function (require, exports, gl_matrix_1) {
    var Camera = (function () {
        function Camera(element) {
            var _this = this;
            this._fovY = 45;
            this._near = 0.1;
            this._far = 100.0;
            this._position = gl_matrix_1.vec3.create();
            this.handleResize = function (width, height) {
                gl_matrix_1.mat4.perspective(_this._projectionMatrix, _this._fovY, width / height, _this._near, _this._far);
            };
            this._element = element;
            this._projectionMatrix = gl_matrix_1.mat4.create();
            this._cameraMatrix = gl_matrix_1.mat4.create();
            this._viewMatrix = gl_matrix_1.mat4.create();
            gl_matrix_1.vec2.create();
            this._element.onResize.connect(this.handleResize);
            this.handleResize(this._element.getWidth(), this._element.getHeight());
        }
        Camera.prototype.update = function () {
            var v3 = gl_matrix_1.vec3.create();
            gl_matrix_1.vec3.set(v3, 0, 0, 300);
            gl_matrix_1.mat4.identity(this._cameraMatrix);
            gl_matrix_1.mat4.translate(this._cameraMatrix, this._cameraMatrix, v3);
            gl_matrix_1.mat4.invert(this._viewMatrix, this._cameraMatrix);
        };
        Camera.prototype.append = function (m4) {
            gl_matrix_1.mat4.multiply(m4, m4, this._viewMatrix);
            gl_matrix_1.mat4.multiply(m4, m4, this._projectionMatrix);
        };
        Camera.prototype.setPerspective = function (fovY, near, far) {
            this._fovY = fovY;
            this._near = near;
            this._far = far;
        };
        Camera.prototype.destruct = function () {
            this._resizeConnection.dispose();
            this._resizeConnection = null;
            this._projectionMatrix = null;
        };
        return Camera;
    })();
    exports.Camera = Camera;
});
