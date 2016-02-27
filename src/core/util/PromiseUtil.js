define(["require", "exports", "./Promise"], function (require, exports, Promise_1) {
    "use strict";
    var PromiseUtil = (function () {
        function PromiseUtil() {
        }
        PromiseUtil.allWithProgress = function (list, onProgress) {
            if (onProgress === void 0) { onProgress = function (progress) { }; }
            var count = list.length;
            var progressList = [];
            for (var i = 0; i < count; i++) {
                progressList.push(0);
            }
            var prvProgress = function (index, onProgress, result) {
                var progress = 1;
                progressList[index] = progress;
                var total = 0;
                var length = progressList.length;
                for (var i = 0; i < length; i++) {
                    total += progressList[i];
                }
                onProgress(total / count);
                return result;
            };
            var promiseList = [];
            for (var i = 0; i < count; i++) {
                promiseList[i] = list[i].then(prvProgress.bind(this, i, onProgress));
            }
            return Promise_1.Promise.all(promiseList);
        };
        PromiseUtil.loadLoadable = function (list, onProgress) {
            if (onProgress === void 0) { onProgress = function (progress) { }; }
            var count = list.length;
            var progressList = [];
            for (var i = 0; i < count; i++) {
                progressList.push(0);
            }
            var prvProgress = function (index, onProgress, progress) {
                progressList[index] = progress;
                var total = 0;
                var length = progressList.length;
                for (var i = 0; i < length; i++) {
                    total += progressList[i];
                }
                onProgress(total / count);
            };
            var promiseList = [];
            for (var i = 0; i < count; i++) {
                promiseList[i] = list[i].load(prvProgress.bind(this, i, onProgress));
            }
            return Promise_1.Promise.all(promiseList);
        };
        return PromiseUtil;
    }());
    exports.PromiseUtil = PromiseUtil;
});
