/**
 * User: rupin_t
 * Date: 7/1/13
 * Time: 4:24 PM
 */

var app = app || {};
app.modules = app.modules || {};

app.modules.articles = function (region) {
    var name = 'articles';

    var Module = app.core.module(name, function (Module) {

        Module.rm = new Marionette.RegionManager();

        // ---- Initializers ----
        Module.addInitializer(function () {
            var articlesView = new Module.views.ArticleList();
            region.show(articlesView);
        });

    });

    Module.models = {};
    Module.collections = {};
    Module.views = {};

    // ---- Models ----
    Module.models.Article = Backbone.Model.extend();

    // ---- Collections ----
    Module.collections.Articles = Backbone.Collection.extend({
        model: Module.models.Article,
        url: '/api/articles'
    });

    // ---- Views ----
    Module.views.Article = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'article-row',
        template: [name, 'article']
    });

    Module.views.ArticleList = Marionette.CompositeView.extend({
        id: 'article-list',
        template: [name, 'article-list'],
        itemView: Module.views.Article,
        collection: new Module.collections.Articles(),
        ui: {
            list: 'ul'
        },
        initialize: function () {
            this.collection.fetch();
        },
        appendHtml: function (collectionView, itemView) {
            collectionView.ui.list.append(itemView.el);
        }
    });

};
