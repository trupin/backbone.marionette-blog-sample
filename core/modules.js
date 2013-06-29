/**
 * User: rupin_t
 * Date: 6/28/13
 * Time: 3:00 PM
 */

var util = require('util'),
    _ = require('underscore'),
    async = require('async');

var tools = require('../lib/tools.js');

var Module = require('../lib/module.js').Module,
    Articles = require('./collections.js').Articles;

exports.Articles = function (options) {
    Module.call(this, options);
};

util.inherits(exports.Articles, Module);

exports.Articles.prototype.initialize = function (options, callback) {
    async.waterfall(tools.binded([
        function (next) {
            this.collection = new Articles();
            this.collection.initialize(next);
        },
        function (next) {
            this.collection.post({
                toto: true
            }, next);
        },
        function (model, next) {
            this.model = model;
            console.log(this.model.toJSON());
            this.model.put({
                toto: false
            }, next);
        },
        function (model, next) {
            this.model = model;
            console.log(this.model.toJSON());
            this.collection.get(this.model.storedData._id, next);
        },
        function (model, next) {
            console.log(model.toJSON(), model.created);
        }
    ], this), callback);
};

exports.Articles.prototype.$getArticles = {
    route: '/articles',
    method: 'get',
    fn: function (params, callback) {
        callback(null, 'it is all fine!');
    }
};