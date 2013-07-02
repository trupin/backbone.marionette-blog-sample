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
var Query = function (data, options) {
    Model.call(this, data, options);
};

util.inherits(Query, Model);

