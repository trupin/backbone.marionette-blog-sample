/**
 * User: rupin_t
 * Date: 6/28/13
 * Time: 4:53 PM
 */

var async = require('async'),
    path = require('path');

var Module = require('../../lib/module.js').Module,
    Articles = require('./articles').Module;

var persistence = require('../../lib/persistence.js');

// To render the modules client directory to clients
app.get('/modules/:module/*', function (req, res) {
    //noinspection JSCheckFunctionSignatures
    res.sendfile(__dirname + '/' + req.params.module + '/client/' + req.params[0], function (err) {
        if (err) res.send(404, 'File not found.');
    });
});

/**
 * Setting up the database and register the modules.
 * @param callback
 */
exports.run = function (callback) {
    async.waterfall([
        function (next) {
            persistence.initDatabase(next);
        },
        function (next) {
            Module.register('articles', Articles, next);
        }
    ], callback);
};