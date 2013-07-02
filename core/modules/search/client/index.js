/**
 * User: rupin_t
 * Date: 7/2/13
 * Time: 11:24 AM
 */

var app = app || {};
app.modules = app.modules || {};

app.modules.search = function (region) {
    var name = 'search';

    var Module = app.core.module(name, function (Module) {

        Module.addInitializer(function () {
            new Module.controllers.Main();
        });

    });

    Module.models = {};
    Module.collections = {};
    Module.views = {};
    Module.controllers = {};

    // ---- Models ----
    Module.models.Search = Backbone.Model.extend({
        defaults: {
            placeholder: 'Search',
            query: ''
        }
    });

    Module.models.Query = Backbone.Model.extend({
        initialize: function (options) {
            this.url = '/api/search/' + options.module + '?' + options.query;
        }
    });

    // ---- Views ----
    Module.views.Search = Marionette.ItemView.extend({
        tagName: 'form',
        className: 'navbar-search',
        template: [name, 'search'],
        model: new Module.models.Search(),
        triggers: {
            'submit form': 'query:submit'
        },
        modelEvents: {
            'change:query': function () {
                this.trigger('search:query', this.model.get('query'));
            }
        },
        ui: {
            query: 'input'
        },
        initialize: function () {
            this.on('query:submit', function (e) {
                e.preventDefault();
            });
            setInterval(_.bind(this._observe, this), 100);
        },
        _observe: function () {
            var query = $.trim(this.ui.query.val());
            if (this.lastQuery !== query)
                this._onQueryChange(query);
            this.lastQuery = query;
        },
        _onQueryChange: function (query) {
            if (this.timer)
                clearTimeout(this.timer);
            this.timer = setTimeout(_.bind(function () {
                this.model.set('query', query);
            }, this), 300);
        }
    });

    // ---- Controllers ----
    Module.controllers.Main = Marionette.Controller.extend({
        initialize: function (options) {
            options = options || {};
            this.module = options.module || 'articles';
            var searchView = new Module.views.Search();
            this.listenTo(searchView, 'search:query', this.onSearchQuery);
            region.show(searchView);
        },
        onSearchQuery: function (query) {

            new Module.models.Query({
                module: this.module,
                query: query
            })
                .fetch()
                .done(_.bind(function (data) {
                    app.core.vent.trigger('search:' + this.module + ':results', data);
                }, this))
                .fail(function (err) {
                    app.core.vent.trigger('error', err);
                });

        }
    });

    return Module;
};