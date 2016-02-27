define(["require", "exports"], function (require, exports) {
    "use strict";
    var DatGuiUniformAutoBind = (function () {
        function DatGuiUniformAutoBind(gui, program) {
            this.gui = gui;
            this.program = program;
            var uniforms = this.program.getUniforms();
            Object.keys(uniforms).forEach(function (name) {
                var uniform = uniforms[name];
            });
        }
        return DatGuiUniformAutoBind;
    }());
    exports.DatGuiUniformAutoBind = DatGuiUniformAutoBind;
});
