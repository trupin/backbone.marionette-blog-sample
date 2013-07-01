/**
 * User: rupin_t
 * Date: 6/28/13
 * Time: 3:00 PM
 */

var util = require('util'),
    _ = require('underscore'),
    async = require('async');

var tools = require(_root + '/lib/tools.js');

var Module = require(_root + '/lib/module.js').Module,
    Collection = require(_root + '/lib/persistence.js').Collection,
    Model = require(_root + '/lib/persistence.js').Model;

// ---- Models ----
var Article = function (data, options) {
    Model.call(this, data, options);
};

util.inherits(Article, Model);

// ---- Collections ----
var Articles = function () {
    Collection.call(this, {
        name: 'articles',
        Model: Article
    });
};

util.inherits(Articles, Collection);

// ------------------- MODULE ---------------

exports.Module = function (options) {
    Module.call(this, options);
};
util.inherits(exports.Module, Module);

exports.Module.prototype.name = 'articles';

exports.Module.prototype.initialize = function (__, callback) {
    async.waterfall(tools.binded([
        function (next) {
            this.collection = new Articles();
            this.collection.initialize(next);
        },
//        function (next) {
//            this.collection.post({
//                toto: true
//            }, next);
//        },
//        function (model, next) {
//            this.model = model;
//            console.log(this.model.toJSON());
//            this.model.put({
//                toto: false
//            }, next);
//        },
//        function (model, next) {
//            this.model = model;
//            console.log(this.model.toJSON());
//            this.collection.get(this.model.get('id'), next);
//        },
//        function (model, next) {
//            console.log(model.toJSON(), model.created);
//            this.model.delete(next);
//        },
//        function (next) {
//            this.collection.get(this.model.get('id'), next);
//        }
    ], this), callback);
};

exports.Module.prototype.$getArticle = {
    route: '/:id',
    method: 'get',
    fn: function (params, callback) {
        this.collection.get(params.id, callback);
    }
};

exports.Module.prototype.$getArticles = {
    route: '/',
    method: 'get',
    fn: function (params, callback) {
        this.collection.find().toArray(callback);
    }
};

exports.Module.prototype.$postArticle = {
    route: '/',
    method: 'post',
    fn: function (params, callback) {
        this.collection.post(params, callback);
    }
};

exports.Module.prototype.$deleteArticle = {
    route: '/:id',
    method: 'delete',
    fn: function (params, callback) {
        this.collection.delete(params.id, callback);
    }
};

exports.Module.prototype.$putArticle = {
    route: '/:id',
    method: 'put',
    fn: function (params, callback) {
        this.collection.put(params, callback);
    }
};