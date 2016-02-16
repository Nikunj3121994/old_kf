define(["require", "exports", "../util/Promise"], function (require, exports, Promise_1) {
    var HttpRequest = (function () {
        function HttpRequest() {
        }
        HttpRequest.request = function (method, url, args) {
            return new Promise_1.default(function (resolve, reject) {
                var client = new XMLHttpRequest();
                var uri = url;
                if (args && (method === 'POST' || method === 'PUT')) {
                    uri += '?';
                    var argcount = 0;
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (argcount++) {
                                uri += '&';
                            }
                            uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                        }
                    }
                }
                client.open(method, uri);
                client.send();
                client.onload = function () {
                    if ((this.status >= 200 && this.status < 400) || this.status === 0) {
                        resolve(this.response || this.responseText);
                    }
                    else {
                        reject(this.statusText);
                    }
                };
                client.onerror = function () {
                    reject(this.statusText);
                };
            });
        };
        HttpRequest.getString = function (url, query) {
            if (query === void 0) { query = {}; }
            return HttpRequest.request('GET', url, query);
        };
        HttpRequest.getJSON = function (url, query) {
            if (query === void 0) { query = {}; }
            return HttpRequest.getString(url, query)
                .then(function (response) { return JSON.parse(response); });
        };
        return HttpRequest;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = HttpRequest;
});
