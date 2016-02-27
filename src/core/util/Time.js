define(["require", "exports"], function (require, exports) {
    var Time = (function () {
        function Time() {
        }
        Time.maxSaveTimeMs = 2147483647;
        Time.getDelta = (function () {
            var startTime = 0;
            return function (time) {
                time = time || new Date().getTime();
                if (!startTime) {
                    startTime = time;
                }
                var returnTime = time - startTime;
                startTime = time;
                return returnTime;
            };
        })();
        Time.getFromStart = (function () {
            var startTime = 0;
            return function (time) {
                time = time || new Date().getTime();
                if (!startTime) {
                    startTime = time;
                }
                return time - startTime;
            };
        })();
        Time.getSafeFromStart = (function () {
            var startTime = 0;
            var maxSaveTimeMs = Time.maxSaveTimeMs;
            return function (time) {
                time = time || new Date().getTime();
                if (!startTime) {
                    startTime = time;
                }
                var rtime = time - startTime;
                if (rtime > maxSaveTimeMs) {
                    rtime = rtime - maxSaveTimeMs * Math.floor(rtime / maxSaveTimeMs);
                }
                return rtime;
            };
        })();
        return Time;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Time;
});
