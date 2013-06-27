/**
 * User: rupin_t
 * Date: 6/27/13
 * Time: 3:50 PM
 */

var app = require('../server.js').app;

app.namespace('/articles', function () {
    app.get('/', function (req, res) {
        res.send([]);
    });
    app.post('/', function (req, res) {
        res.send('not implemented yet');
    });

    app.namespace('/:id', function () {
        app.get('/', function (req, res) {
            res.send('coucou je suis l\'article : ' + req.params.id);
        });
        app.put('/', function (req, res) {
            res.send('not implemented yet');
        });
    });
});