const Backbone = require('backbone');
const Marionette = require('marionette');
const _ = require('underscore');

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

  initialize(options) {
    this.viewCollection = options.viewCollection;
    this.listenTo(this.viewCollection, 'sonarr:filter', this._toggleFilterStatus);
  },

  onRender() {
    if (this.model.get('active')) {
      this._setFilterStatus();
    }
  },

  _onClick(e) {
    e.preventDefault();

    if (this.viewCollection) {
      this.viewCollection.trigger('sonarr:filter', this.model);
    }
  },

  _toggleFilterStatus(model) {
    if (model.get('key') === this.model.get('key')) {
      this._setFilterStatus();
    } else {
      this._removeFilterStatus();
    }
  },

  _setFilterStatus() {
    this.$el.addClass('active');
  },

  _removeFilterStatus() {
    this.$el.removeClass('active');
  }
});
