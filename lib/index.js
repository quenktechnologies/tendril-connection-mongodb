"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connector = exports.Connection = void 0;
var mongodb_1 = require("mongodb");
var future_1 = require("@quenk/noni/lib/control/monad/future");
/**
 * Connection implementation for the MongoClient.
 *
 * This uses a single MongoClient and checkouts individual db references.
 * XXX: Note all the usages of <any> here are because the current types
 * are outdated (v 2.x.x).
 */
var Connection = /** @class */ (function () {
    function Connection(client) {
        this.client = client;
    }
    Connection.prototype.open = function () {
        var _this = this;
        return future_1.fromCallback(function (cb) { return _this.client.connect(cb); })
            .map(function () { return _this; });
    };
    Connection.prototype.checkout = function () {
        return future_1.pure((this.client).db());
    };
    Connection.prototype.close = function () {
        var _this = this;
        return future_1.fromCallback(function (cb) { return (_this.client).close(cb); });
    };
    return Connection;
}());
exports.Connection = Connection;
/**
 * connector for creating Connections to a MongoDB instance.
 */
exports.connector = function (url, opts) {
    if (opts === void 0) { opts = {}; }
    return new Connection(new mongodb_1.MongoClient(url, opts));
};
//# sourceMappingURL=index.js.map