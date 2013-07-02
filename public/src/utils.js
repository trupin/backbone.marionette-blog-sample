/**
 * User: rupin_t
 * Date: 7/2/13
 * Time: 6:32 PM
 */

var app = app || {};

app.setHandlers = function (core) {
    /**
     * Publishes on a channel.
     */
    core.commands.setHandler('publish', function (channel, message, options) {
        // TODO implement it.
    });

    /**
     * Subscribes for a channel.
     */
    core.commands.setHandler('subscribe', function (channel, callback) {
        // TODO implement it.
    });

    /**
     * Creates a get query with $.ajax and return the promise.
     */
    core.reqres.setHandler('request', function (query, options) {
        options = options || {};
        options.url = query;
        options.type = 'GET';
        return $.ajax(options);
    });

    /**
     * Publishes an error on the server error channel.
     */
    core.commands.setHandler('error', function (error) {
        // TODO implements it.
    });

};

