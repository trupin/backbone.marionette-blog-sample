/**
 * User: rupin_t
 * Date: 6/27/13
 * Time: 3:38 PM
 */

var express = require('express');
require('express-namespace');

// exports the application server
var app = exports.app = express();

// set up the server configuration
app.configure(function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
});

// applying the routes
require('./routes');

app.listen(3000);
console.log('Server launched at "http://localhost:3000"');