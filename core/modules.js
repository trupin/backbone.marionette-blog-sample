/**
 * User: rupin_t
 * Date: 6/28/13
 * Time: 3:00 PM
 */

var util = require('util'),
    _ = require('underscore'),
    async = require('async');

var Module = require('../lib/module.js').Module;

exports.Articles = function (options) {
    Module.call(this, options);
};

util.inherits(exports.Articles, Module);

exports.Articles.prototype.$getArticles = {
    route: '/article',
    method: 'get',
    fn: function (params, callback) {
        console.log(params);
        callback(null, 'it is all fine!');
    }
};