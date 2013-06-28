/**
 * User: rupin_t
 * Date: 6/28/13
 * Time: 1:41 PM
 */

var util = require('util'),
    _ = require('underscore'),
    async = require('async');

var Model = require('../lib/persistence.js').Model;

exports.Article = function (data, options) {
    Model.call(this, data, options);
};

util.inherits(exports.Article, Model);