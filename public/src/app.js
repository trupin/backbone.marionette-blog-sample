/**
 * User: rupin_t
 * Date: 6/27/13
 * Time: 3:09 PM
 */

var app = app || {};

app.core = new Backbone.Marionette.Application();

app.core.addRegions({
    header: app.regions.Header,
    footer: app.regions.Footer,
    left: app.regions.BodyLeft,
    center: app.regions.BodyCenter,
    right: app.regions.BodyRight
});

app.core.addInitializer(function () {
    app.modules.articles(app.core.center);
});

$(document).ready(function () {
    app.core.start();
});