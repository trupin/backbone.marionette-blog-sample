/**
 * User: rupin_t
 * Date: 6/27/13
 * Time: 3:09 PM
 */

var app = app || {};

app.core = new Backbone.Marionette.Application();

app.core.addRegions({
    mainRegion: app.regions.Main
});

app.core.addInitializer(function (options) {
    var articleListView = new app.views.ArticleList({
        collection: options.articles
    });
    this.mainRegion.show(articleListView);
});

$(document).ready(function () {

    var articles = new app.collections.Articles([
        new app.models.Article({
            body: "this is a sample article."
        }),
        new app.models.Article({
            body: "this is a second sample article."
        })
    ]);

    app.core.start({
        articles: articles
    });

    articles.add(new app.models.Article({
        body: 'I just added this article.'
    }));

});