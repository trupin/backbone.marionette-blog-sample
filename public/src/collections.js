/**
 * User: rupin_t
 * Date: 6/27/13
 * Time: 5:20 PM
 */

var app = app || {};
app.collections = {};

app.collections.Articles = Backbone.Collection.extend({
    model: app.models.Article
});