/**
 * User: rupin_t
 * Date: 7/2/13
 * Time: 11:24 AM
 */

var util = require('util'),
    _ = require('underscore'),
    async = require('async');

var tools = require(_root + '/lib/tools.js');

var Module = require(_root + '/lib/module.js').Module,
    Collection = require(_root + '/lib/persistence.js').Collection,
    Model = require(_root + '/lib/persistence.js').Model;

// ---- Models ----
var Query = exports.Query = function (data, options) {
    Model.call(this, data, options);
};
util.inherits(Query, Model);

var Response = exports.Response = function (data, options) {
    Model.call(this, data, options);
};
util.inherits(Response, Model);

Response.prototype.toJSON = function () {
    return _.extend(Model.prototype.toJSON.call(this), {
        items: _.map(this.get('items'), function (item) {
            return item.toJSON();
        })
    });
};

// ------------------- MODULE ---------------
exports.Module = function (options) {
    Module.call(this, options);
};
util.inherits(exports.Module, Module);

exports.Module.prototype.name = 'search';

exports.Module.prototype.$search = {
    route: '/:module',
    method: 'get',
    EntityIn: Query,
    EntityOut: Response,
    fn: function (query, callback) {
        var module = Module.get(query.get('module'));
        if (!module)
            return callback(new _errors.NotFound('This module doesn\'t exists.'));
        module.search(query, callback);
    }
};