/**
 * User: rupin_t
 * Date: 6/28/13
 * Time: 2:08 PM
 */

var util = require('util'),
    EventEmitter = require('eventemitter2').EventEmitter2,
    _ = require('underscore'),
    async = require('async');

var missing = require('./tools.js').missing;

exports.Module = function (options) {
    var _missing = missing.bind(this);
    options = options || {};
    this.app = options.app || _missing('app');
};

util.inherits(exports.Module, EventEmitter);

exports.Module.factory = {};
exports.Module.get = function (name) {
    return exports.Module.factory[name];
};

exports.Module.register = function (name, Module, options) {
    if (!exports.Module.factory[name])
        exports.Module._registerRoutes(Module, options.app);
    return exports.Module.factory[name] = new Module(options);
};

exports.Module._registerRoutes = function (Module, app) {
    // registers the express routes.
    _.each(Module.prototype, function (fn, route) {
        if (route.toString().indexOf('$') === 0) {
            var method =
                route.indexOf('post') === 1 ? 'post' :
                    route.indexOf('put') === 1 ? 'put' :
                        route.indexOf('delete') === 1 ? 'delete' :
                            route.indexOf('get') === 1 ? 'get' : 'all';
            var middlewares = [];
            if (_.isObject(fn)) {
                method = fn.method || method;
                middlewares = fn.middleware || [];
                route = fn.route || '/' + route.substring(1, route.length);
                fn = fn.fn;
            }
            middlewares.push(function (req, res) {
                var params = _.chain({})
                    .extend(req.query)
                    .extend(req.body)
                    .extend(req.params)
                    .value();
                fn(params, function (err, result) {
                    if (err)
                        return res.send(501, err);
                    return res.send(result);
                });
            });
            console.log(method, route, middlewares);
            app[method](route, middlewares);
        }
    }.bind(this));
};

exports.Module.prototype.stop = function () {
    console.log('not implemented.');
};