var PageableCollection = require('backbone.paginator');
var Marionette = require('marionette');
var FilteringView = require('./FilteringView');
var Config = require('../../../Config');

module.exports = Marionette.CompositeView.extend({
    itemView          : FilteringView,
    template          : 'Sidebar/ActionBar/Filtering/FilteringCollectionViewTemplate',
    itemViewContainer : '.x-filtering-list',

    initialize : function(options) {
        this.menu = options.menu;
        this.viewCollection = options.viewCollection;
        this._setActive();
        this._setInitialFilter();
        this.listenTo(this.viewCollection, 'sonarr:filter', this._filter);
    },

    itemViewOptions : function() {
        return {
            viewCollection : this.viewCollection
        };
    },

    _setActive : function() {
        var storedKey = this.menu.defaultAction;

        if (this.menu.storeState) {
            storedKey = Config.getValue(this.menu.menuKey, storedKey);
        }

        if (!storedKey) {
            return;
        }

        this.collection.each(function(model) {
            if (model.get('key').toLocaleLowerCase() === storedKey.toLowerCase()) {
                model.set('active', true);
            } else {
                model.set('active', false);
            }
        });
    },

    _filter : function(model) {
        if (this.menu.storeState) {
            Config.setValue(this.menu.menuKey, model.get('key'));
        }

        if (this.menu.callback) {
            this.menu.callback.call(model.ownerContext, model);
        } else {
            var mode = model.get('key');
            this.viewCollection.setFilterMode(mode);
        }

        this._filterCollection();

        return this;
    },

    _setInitialFilter : function () {
        if (this.menu.storeState) {
            var mode = Config.getValue(this.menu.menuKey);

            if (mode && !this.menu.callback) {
                this.viewCollection.setFilterMode(mode);
            }
        }

        this._filterCollection();
    },

    _filterCollection : function () {
        if (this.viewCollection.mode === 'server') {
            this.viewCollection.state.currentPage = 1;
            this.viewCollection.fetch();
        }
    }
});