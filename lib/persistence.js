/**
 * User: rupin_t
 * Date: 6/27/13
 * Time: 4:09 PM
 */

var util = require('util'),
    EventEmitter = require('eventemitter2').EventEmitter2,
    _ = require('underscore'),
    async = require('async');

var missing = require('./tools.js').missing,
    binded = require('./tools.js').binded;

/**
 * A Model base class to manage the persistence of the data
 * The collection attribute must be overloaded.
 * @param data
 * @constructor
 * @param options
 */
exports.Model = function (data, options) {
    var _missing = missing.bind(this);

    options = options || {};
    this.created = !!options.created;
    if (options.created) {
        this.data = {};
        this.storedData = data;
    }
    else {
        this.data = data;
        this.storedData = {};
    }
    this.collection = options.collection || _missing("collection");

    if (this._error)
        throw this._error;
};

util.inherit(exports.Model, EventEmitter);

exports.Model.prototype.set = function (attr, value) {
    this.data[attr] = value;
};

exports.Model.prototype.get = function (attr) {
    return this.data[attr] || this.storedData[attr];
};

exports.Model.prototype.put = function (data, callback) {
    if (!callback) {
        callback = data;
        data = {};
    }
    this.data = _.extends(this.data, data);
    this.collection.put(this, callback);
};

exports.Model.prototype.delete = function (callback) {
    this.collection.delete(this, callback);
};

/**
 * A Collection base class to manage the way mongo store the models
 * @param Model
 * @param options
 * @constructor
 */
exports.Collection = function (options) {
    var _missing = missing.bind(this);

    options = options || {};
    this.name = options.name || _missing('name');
    this.Model = options.Model || _missing('Model');
    this.index = options.index || '_id';

    if (this._error)
        throw this._error;
};

util.inherit(exports.Collection, EventEmitter);

/**
 * Mongo server configuration --> to overload.
 * @type {{db: string, host: string, port: string}}
 */
exports.Collection.server = {
    db: 'test',
    host: '127.0.0.1',
    port: '27017'
};

/**
 * Initialize the unique used database for this application.
 * @param options
 * @param callback
 */
exports.initDatabase = function (options, callback) {
    var MongoClient = require('mongodb').MongoClient,
        Server = require('mongodb').Server;

    exports.Collection.client = new MongoClient(
        new Server(exports.Collection.server.host, exports.Collection.server.port, {
            auto_reconnect: true
        })
    );

    exports.Collection.client.open(function (err) {
        if (err) return callback(err);
        exports.Collection.db = exports.Collection.client.db(
            exports.Collection.server.db
        );
        return callback(null);
    });
};

/**
 * Initialize a collection by ensuring the collection exists with its indexes.
 * @param callback
 */
exports.Collection.prototype.initialize = function (callback) {
    async.waterfall(binded([
        function (next) {
            exports.Collection.db.collection(next);
        },
        function (collection, next) {
            this.collection = collection;
            collection.ensureIndex(this.index, {unique:true}, next);
        }
    ]), callback);
};

/**
 * Creates a Model in this collection.
 * @param data
 * @param callback
 */
exports.Collection.prototype.post = function (data, callback) {
    this.collection.insert(data, function (err, res) {
        if (err)
            return callback(err);
        return callback(null, new this.Model(res, { created: true }));
    });
};

/**
 * Put some new data into a model of this collection.
 * @param model
 * @param data
 * @param callback
 * @returns {*}
 */
exports.Collection.prototype.put = function (model, data, callback) {
    if (!_.keys(model.storedData).length || !model.created)
        return callback(Error('Cannot put on a non created model.'));
    async.waterfall(binded([
        function (next) {
            this.collection.findAndModify(_.pick(model.storedData, this.index), [], {$set: model.data}, {new:true}, next);
        },
        function (doc, next) {
            model.storedData = doc;
            next(model, next);
        }
    ]), callback);
};

/**
 * Gets a model from this collection.
 * @param id
 * @param callback
 */
exports.Collection.prototype.get = function (id, callback) {
    var req = {};
    req[this.index] = id;
    this.collection.findOne(req, function (err, doc) {
        if (err)
            return callback(err);
        return callback(null, new this.Model(doc, { created: true }));
    });
};

/**
 * Deletes a model from this collection.
 * @param model
 * @param callback
 * @returns {*}
 */
exports.Collection.prototype.delete = function (model, callback) {
    if (!_.keys(model.storedData).length || !model.created)
        return callback(new Error('Cannot delete a non created model.'));
    this.collection.findAndRemove(_.pick(model.storedData, this.index), [], callback);
};