/**
 * User: rupin_t
 * Date: 6/28/13
 * Time: 2:08 PM
 */

var util = require('util'),
    EventEmitter = require('eventemitter2').EventEmitter2,
    _ = require('underscore'),
    async = require('async'),
    express = require('express'),
    hbs = require('hbs'),
    fs = require('fs');

var missing = require('./tools.js').missing,
    Model = require('./persistence.js').Model;

exports.Module = function (options) {
    var _missing = missing.bind(this);
    options = options || {};
    this.app = options.app || _missing('app');
};

util.inherits(exports.Module, EventEmitter);

/**
 * @type {object}
 */
exports.Module.factory = {};

/**
 * Gets a module.
 * @param {string} name
 * @returns {object}
 */
exports.Module.get = function (name) {
    return exports.Module.factory[name];
};

/**
 * Registers a module.
 * @param {string} name
 * @param {object} Module
 * @param {object} options
 * @param {function} callback
 * @returns {Module}
 */
exports.Module.register = function (name, Module, options, callback) {
    if (!callback) {
        callback = options;
        options = {};
    }
    var isPresent = !!exports.Module.factory[name];
    var m = exports.Module.factory[name] = new Module(options);
    if (m.initialize)
        return m.initialize(options, function (err) {
            if (err) return callback(err);
            if (!isPresent)
                exports.Module._registerRoutes(Module, m);
            callback(null);
        });
    else if (!isPresent)
        return callback(exports.Module._registerRoutes(Module, m));
    callback(null);
};

/**
 * Registers a module routes
 * @param {object} Module
 * @param {object} instance
 * @private
 */
exports.Module._registerRoutes = function (Module, instance) {
    if (!Module.prototype.name || !Module.prototype.name.length)
        return Error('Missing module name.');

    _.each(Module.prototype, function (fn, route) {
        if (route.toString().indexOf('$') === 0) {
            var method = fn.method || 'get';
            var middleware = fn.middleware || [];
            if (!_.isArray(middleware)) middleware = [middleware];
            route = fn.route || '/' + route.substring(1, route.length);
            fn = fn.fn;
            if (fn) {
                middleware.push(function (req, res) {
                    var params = _.chain({})
                        .extend(req.query)
                        .extend(req.body)
                        .extend(req.params)
                        .value();
                    fn.call(instance, params, function (err, result) {
                        if (err) {
                            if (err instanceof _errors.HtmlError)
                                return res.send(err.code, err.message);
                            return res.send(501, err);
                        }
                        if (_.isArray(result) || _.isObject(result))
                            _.each(result, function (v, k) {
                                if (v instanceof Model)
                                    result[k] = v.toJSON();
                            });
                        else if (result instanceof Model) result = result.toJSON();
                        return res.send(result);
                    });
                });
            }
            if (!middleware.length)
                throw new Error('Cannot register a route without at least one Function or one Middleware.');
            for (var i = 0; i < middleware.length; ++i)
                middleware[i] = middleware[i].bind(instance);
            route = '/api/' + Module.prototype.name + route;
            route = route.replace(/\/$/, '');
            console.log('method: ' + method + ' - route : ' + route);
            app[method](route, middleware);
        }
    }.bind(this));
};

/**
 * Checks the modules directory to import the modules
 */
var _names = [], modules = [];
async.waterfall([
    function (next) {
        fs.readdir(_root + '/core/modules', next);
    },
    function (names, next) {
        _names = names;
        async.map(names, function (item, done) {
            fs.stat(_root + '/core/modules/' + item, done);
        }, next);
    },
    function (stats) {
        _.each(stats, function (stat, i) {
            if (stat.isDirectory()) modules.push(_names[i]);
        });
        console.log(modules);
    }
], function (err) {
    if (err) throw err;
});
exports.Module.moduleDirNames = modules;

/**
 * Handlebars helper to include modules client sources.
 */
hbs.registerHelper('modulesJs', function () {
    var html = '';
    _.each(modules, function (name) {
        html += '<script type="text/javascript" src="/modules/' + name + '/index.js"></script>';
    });
    return html;
});