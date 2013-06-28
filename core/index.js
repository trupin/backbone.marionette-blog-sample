/**
 * User: rupin_t
 * Date: 6/28/13
 * Time: 4:53 PM
 */

var Module = require('../lib/module.js').Module,
    Articles = require('./modules.js').Articles;

exports.run = function (app, callback) {

    var articles = Module.register('articles', Articles, { app: app });

    callback(null);
};