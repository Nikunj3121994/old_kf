define(["require", "exports"], function (require, exports) {
    var Flag = (function () {
        function Flag(value) {
            if (value === void 0) { value = 0; }
            this._value = 0 + value;
        }
        Flag.contains = function (a, value) {
            var n = 0 + value;
            return (a & n) === n;
        };
        Flag.add = function (a, value) {
            var n = 0 + value;
            return a | n;
        };
        Flag.remove = function (a, value) {
            var n = 0 + value;
            return (a ^ n) & a;
        };
        Flag.set = function (a, value) {
            return a;
        };
        Flag.equals = function (a, value) {
            var n = 0 + value;
            return a === n;
        };
        Flag.diff = function (a, value) {
            var n = 0 + value;
            return (a ^ n);
        };
        Flag.intersection = function (a, value) {
            var n = 0 + value;
            return (a & n);
        };
        Flag.prototype.contains = function (value) {
            return Flag.contains(this._value, value);
        };
        Flag.prototype.add = function (value) {
            this._value = Flag.add(this._value, value);
        };
        Flag.prototype.remove = function (value) {
            this._value = Flag.remove(this._value, value);
        };
        Flag.prototype.set = function (value) {
            this._value = 0 + value;
        };
        Flag.prototype.equals = function (value) {
            var n = 0 + value;
            return this._value === n;
        };
        Flag.prototype.diff = function (value) {
            return new Flag(Flag.diff(this._value, value));
        };
        Flag.prototype.intersection = function (value) {
            return new Flag(Flag.intersection(this._value, value));
        };
        Flag.prototype.valueOf = function () {
            return this._value;
        };
        Flag.prototype.toString = function (value) {
            return this._value.toString(value);
        };
        return Flag;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Flag;
});
