var Marionette = require('marionette');
var tpl = require('./SortingView.hbs');

module.exports = Marionette.ItemView.extend({
  template: tpl,
  className: 'actionbar-list-item actionbar-sorting-list-item',
  tagName: 'li',

  ui: {
    icon: 'i'
  },

  events: {
    'click': 'onClick'
  },

  initialize: function(options) {
    this.viewCollection = options.viewCollection;
    this.listenTo(this.viewCollection, 'drone:sort', this.render);
    this.listenTo(this.viewCollection, 'backgrid:sort', this.render);
  },

  onRender: function() {
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

  onClick: function(e) {
    e.preventDefault();
    this.viewCollection.setSort(this.model.get('name'));
  },

  _convertDirectionToIcon: function(dir) {
    if (dir === 'ascending' || dir === -1) {
      return 'icon-sonarr-caret-asc';
    }

    return 'icon-sonarr-caret-desc';
  },

  _setSortStatus: function(dir) {
    this._removeSortStatus();
    this.ui.icon.addClass(this._convertDirectionToIcon(dir));
    this.$el.addClass('active');
  },

  _removeSortStatus: function() {
    this.ui.icon.removeClass('icon-sonarr-sort-asc icon-sonarr-sort-desc');
    this.$el.removeClass('active');
  }
});
