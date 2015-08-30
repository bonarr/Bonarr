var Backbone = require('backbone');
var Marionette = require('marionette');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
    template : 'Sidebar/ActionBar/Sorting/SortingViewTemplate',
    className : 'sidebar-right-list-item sidebar-right-sorting-list-item',
    tagName  : 'li',

    ui : {
        icon : 'i'
    },

    events : {
        'click' : 'onClick'
    },

    initialize : function(options) {
        this.viewCollection = options.viewCollection;
        this.listenTo(this.viewCollection, 'drone:sort', this.render);
        this.listenTo(this.viewCollection, 'backgrid:sort', this.render);
    },

    onRender : function() {
        if (this.viewCollection.state) {
            var sortKey = this.viewCollection.state.sortKey;
            var name = this.viewCollection._getSortMapping(sortKey).name;
            var order = this.viewCollection.state.order;

            if (name === this.model.get('name')) {
                this._setSortStatus(order);
            } else {
                this._removeSortStatus();
            }
        }
    },

    onClick : function(e) {
        e.preventDefault();

        var collection = this.viewCollection;
        var event = 'drone:sort';

        var direction = collection.state.order;
        if (direction === 'ascending' || direction === -1) {
            direction = 'descending';
        } else {
            direction = 'ascending';
        }

        collection.setSorting(this.model.get('name'), direction);
        collection.trigger(event, this.model, direction);
    },

    _convertDirectionToIcon : function(dir) {
        if (dir === 'ascending' || dir === -1) {
            return 'icon-sonarr-caret-asc';
        }

        return 'icon-sonarr-caret-desc';
    },

    _setSortStatus : function(dir) {
        this._removeSortStatus();
        this.ui.icon.addClass(this._convertDirectionToIcon(dir));
        this.$el.addClass('active');
    },

    _removeSortStatus : function() {
        this.ui.icon.removeClass('icon-sonarr-sort-asc icon-sonarr-sort-desc');
        this.$el.removeClass('active');
    }
});