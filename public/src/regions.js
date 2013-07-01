/**
 * User: rupin_t
 * Date: 6/27/13
 * Time: 4:31 PM
 */

var app = app || {};
app.regions = {};

app.regions.Header =  Backbone.Marionette.Region.extend({
    el: "header"
});

app.regions.Footer = Backbone.Marionette.Region.extend({
    el: "footer"
});

app.regions.BodyCenter =  Backbone.Marionette.Region.extend({
    el: "#body-center"
});

app.regions.BodyLeft = Backbone.Marionette.Region.extend({
    el: "#body-left"
});

app.regions.BodyRight = Backbone.Marionette.Region.extend({
    el: "#body-right"
});