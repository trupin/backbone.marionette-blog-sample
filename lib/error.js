/**
 * User: rupin_t
 * Date: 7/1/13
 * Time: 3:08 PM
 */

var util = require('util');

/**
 * Error base class
 * @param msg
 * @param code
 * @param constr
 * @constructor
 */
var HtmlError = exports.HtmlError = function (msg, code, constr) {
    Error.captureStackTrace(this, constr || this);
    this.message = msg || 'Error';
    this.code = code || 501;
};

util.inherits(HtmlError, Error);

HtmlError.prototype.name = 'Abstract Error';

exports.NotFound = function (msg) {
    HtmlError.call(this, msg, 404, this.constructor);
};
util.inherits(exports.NotFound, HtmlError);

exports.NotFound.prototype.message = 'Not Found Error';

exports.Internal = function (msg) {
    HtmlError.call(this, msg, 501, this.constructor);
};
util.inherits(exports.Internal, HtmlError);

exports.NotFound.prototype.message = 'Internal Error';