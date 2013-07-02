/**
 * User: rupin_t
 * Date: 7/2/13
 * Time: 10:34 AM
 */

var app = app || {};
app.modules = app.modules || {};

app.modules.navigation = function (region) {
    var name = 'navigation';

    var Module = app.core.module(name, function (Module) {

        Module.addInitializer(function () {
            region.show(new Module.views.Navigation());
        });

    });

    Module.models = {};
    Module.collections = {};
    Module.views = {};

    // ---- Models ----
    Module.models.ItemLink = Backbone.Model.extend({
        defaults: {
            label: 'Default link',
            url: '/',
            active: false
        }
    });

    Module.models.Navigation = Backbone.Model.extend({
        defaults: {
            title: 'Blog Sample'
        }
    });

    // ---- Collections ----
    Module.collections.ItemLinks = Backbone.Collection.extend();

    // ---- Views ----
    Module.views.ItemLink = Marionette.ItemView.extend({
        tagName: 'li',
        template: [name, 'item-link'],
        model: new Module.models.ItemLink(),
        onRender: function () {
            if (this.model.get('active'))
                this.$el.addClass('active');
        }
    });

    Module.views.Navigation = Marionette.CompositeView.extend({
        tagName: 'nav',
        className: 'navbar',
        template: [name, 'navigation'],
        itemView: Module.views.ItemLink,
        model: new Module.models.Navigation(),
        collection: new Module.collections.ItemLinks(),
        ui: {
            list: 'ul'
        },
        appendHtml: function (collectionView, itemView) {
            collectionView.ui.list.append(itemView.el);
        }
    });

};