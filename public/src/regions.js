/**
 * User: rupin_t
 * Date: 6/27/13
 * Time: 4:31 PM
 */

var app = app || {};
app.regions = {};

app.regions.Main =  Backbone.Marionette.Region.extend({
    el: "#content"
});

