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
    app.setHandlers(this);
});

app.core.addInitializer(function () {
    var navigation = app.modules.navigation(app.core.header);
    app.modules.search(navigation.rm.get('search'));

    app.modules.articles(app.core.center);
});

$(document).ready(function () {
    app.core.start();
});