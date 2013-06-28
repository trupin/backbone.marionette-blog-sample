/**
 * User: rupin_t
 * Date: 6/28/13
 * Time: 1:41 PM
 */

var util = require('util'),
    _ = require('underscore'),
    async = require('async');

var Collection = require('../lib/persistence.js').Collection,
    models = require('./models.js');

exports.Articles = function () {
    Collection.call(this, {
        name: 'articles',
        Model: models.Article
    });
};

util.inherits(exports.Articles, Collection);