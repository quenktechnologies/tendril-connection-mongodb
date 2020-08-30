"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connector = exports.MongoDBConnection = void 0;
var mongodb_1 = require("mongodb");
var future_1 = require("@quenk/noni/lib/control/monad/future");
/**
 * MongoDBConnection Connection implementation.
 *
 * This uses a single MongoClient and checkouts individual db references.
 */
var MongoDBConnection = /** @class */ (function () {
    function MongoDBConnection(client) {
        this.client = client;
    }
    MongoDBConnection.prototype.open = function () {
        var _this = this;
        return future_1.fromCallback(function (cb) { return _this.client.connect(cb); }).map(function () { });
    };
    MongoDBConnection.prototype.checkout = function () {
        return future_1.pure((this.client).db());
    };
    MongoDBConnection.prototype.close = function () {
        var _this = this;
        return future_1.fromCallback(function (cb) { return (_this.client).close(cb); });
    };
    return MongoDBConnection;
}());
exports.MongoDBConnection = MongoDBConnection;
/**
 * connector for creating Connections to a MongoDB instance.
 */
exports.connector = function (url, opts) {
    if (opts === void 0) { opts = {}; }
    return new MongoDBConnection(new mongodb_1.MongoClient(url, opts));
};
//# sourceMappingURL=index.js.map