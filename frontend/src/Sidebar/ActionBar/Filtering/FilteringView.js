var Backbone = require('backbone');
var Marionette = require('marionette');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
  template: 'Sidebar/ActionBar/Filtering/FilteringViewTemplate',
  className: 'actionbar-list-item actionbar-filtering-list-item',
  tagName: 'li',

  ui: {
    icon: 'i'
  },

  events: {
    'click': '_onClick'
  },

  initialize: function(options) {
    this.viewCollection = options.viewCollection;
    this.listenTo(this.viewCollection, 'sonarr:filter', this._toggleFilterStatus);
  },

  onRender: function() {
    if (this.model.get('active')) {
      this._setFilterStatus();
    }
  },

  _onClick: function(e) {
    e.preventDefault();

    if (this.viewCollection) {
      this.viewCollection.trigger('sonarr:filter', this.model);
    }
  },

  _toggleFilterStatus: function(model) {
    if (model.get('key') === this.model.get('key')) {
      this._setFilterStatus();
    } else {
      this._removeFilterStatus();
    }
  },

  _setFilterStatus: function() {
    this.$el.addClass('active');
  },

  _removeFilterStatus: function() {
    this.$el.removeClass('active');
  }
});