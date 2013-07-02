/**
 * User: rupin_t
 * Date: 6/27/13
 * Time: 3:38 PM
 */

var express = require('express'),
    hbs = require('hbs');

// exports the application server
var app = exports.app = global.app = express();
global._root = __dirname;
global._errors = require('./lib/error.js');

// set up the server configuration
app.configure(function () {
    app.set('port', process.env.port || 3000);

    app.set('view engine', 'html');
    app.engine('html', hbs.__express);
    app.set('views', __dirname + '/views');

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.cookieSession({ secret: 'secret'}));
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', function (req, res) {
    res.render('index.html');
});

require('./lib/persistence.js').database.name = 'blog-sample';

require('./core/modules').run(function (err) {
    if (err) return console.log(err);

    app.listen(app.get('port'));
    console.log('Server launched at "http://localhost:' + app.get('port') + '"');
});

