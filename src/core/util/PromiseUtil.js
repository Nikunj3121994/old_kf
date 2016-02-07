define(["require", "exports", "./Promise"], function (require, exports, Promise_1) {
    var PromiseUtil = (function () {
        function PromiseUtil() {
        }
        PromiseUtil.allWithProgress = function (list, onProgress) {
            if (onProgress === void 0) { onProgress = function (progress) { }; }
            return new Promise_1.default(function (resolve) {
                var newList = [];
                var then = function (response) {
                    newList.push(response);
                    onProgress(newList.length / list.length);
                    if (newList.length == list.length) {
                        resolve(newList);
                    }
                };
                for (var i = 0; i < list.length; i++) {
                    list[i].then(then);
                }
            });
        };
        PromiseUtil.allForLoadable = function (list, onProgress) {
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
            return Promise_1.default.all(promiseList);
        };
        return PromiseUtil;
    })();
    exports.PromiseUtil = PromiseUtil;
});
