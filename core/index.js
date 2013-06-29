/**
 * User: rupin_t
 * Date: 6/28/13
 * Time: 4:53 PM
 */

var async = require('async');

var Module = require('../lib/module.js').Module,
    Articles = require('./modules.js').Articles;

var persistence = require('../lib/persistence.js');

/**
 * Setting up the database name
 * @type {string}
 */
persistence.database.name = 'blog-sample';

exports.run = function (app, callback) {
    async.waterfall([
        function (next) {
            persistence.initDatabase(next);
        },
        function (next) {
            Module.register('articles', Articles, { app: app }, next)
        }
    ], callback);
};