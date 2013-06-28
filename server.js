/**
 * User: rupin_t
 * Date: 6/27/13
 * Time: 3:38 PM
 */

var express = require('express');

// exports the application server
var app = exports.app = express();

// set up the server configuration
app.configure(function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
});

require('./core').run(app, function (err) {
    if (err) throw err;

    app.listen(3000);
    console.log('Server launched at "http://localhost:3000"');
});

