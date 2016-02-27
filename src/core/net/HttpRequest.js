define(["require", "exports", "../util/Promise"], function (require, exports, Promise_1) {
    "use strict";
    var HttpRequest = (function () {
        function HttpRequest(path, query, type) {
            if (query === void 0) { query = {}; }
            this._hasLoaded = false;
            this.path = path;
            this.query = query;
            this.type = type;
        }
        HttpRequest.request = function (method, url, args) {
            return new Promise_1.Promise(function (resolve, reject) {
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
        HttpRequest.prototype.hasLoaded = function () {
            return this._hasLoaded;
        };
        HttpRequest.prototype.load = function (onProgress) {
            var _this = this;
            if (!this._promise) {
                this._promise = HttpRequest.getString(this.path, this.query).then(function (data) {
                    if (onProgress) {
                        onProgress(1);
                    }
                    _this._hasLoaded = true;
                    _this.data = data;
                    return data;
                });
            }
            return this._promise;
        };
        return HttpRequest;
    }());
    exports.HttpRequest = HttpRequest;
    (function (Type) {
        Type[Type["JSON"] = 0] = "JSON";
        Type[Type["STRING"] = 1] = "STRING";
    })(exports.Type || (exports.Type = {}));
    var Type = exports.Type;
});
