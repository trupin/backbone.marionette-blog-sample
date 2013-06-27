/**
 * User: rupin_t
 * Date: 6/27/13
 * Time: 5:23 PM
 */

var app = app || {};
app.views = {};

app.views.Article = Backbone.Marionette.ItemView.extend({
    tagName: 'li',
    className: 'article-row',
    template: '#article-template'
});

app.views.ArticleList = Backbone.Marionette.CompositeView.extend({
    id: 'article-list',
    template: '#article-list-template',
    itemView: app.views.Article,
    ui: {
        list: 'ul'
    },
    appendHtml: function (collectionView, itemView) {
        collectionView.ui.list.append(itemView.el);
    }
});
