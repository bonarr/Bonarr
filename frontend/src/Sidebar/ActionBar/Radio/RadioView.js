var Marionette = require('marionette');
var Config = require('Config');

module.exports = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'actionbar-list-item actionbar-radio-list-item',
  template: 'Sidebar/ActionBar/Radio/RadioViewTemplate',

  ui: {
    icon: 'i'
  },

  events: {
    'click': 'onClick'
  },

  initialize: function() {
    this.storageKey = this.model.get('menuKey') + ':' + this.model.get('key');
  },

  onRender: function() {
    if (this.model.get('active')) {
      this.$el.addClass('active');
      this.invokeCallback();
    }

    if (this.model.get('tooltip')) {
      this.$el.attr('title', this.model.get('tooltip'));
    }
  },

  onClick: function() {
    if (this.model.get('active')) {
      return;
    }

    Config.setValue(this.model.get('menuKey'), this.model.get('key'));
    this.invokeCallback();
    this.trigger('click');
  },

  invokeCallback: function() {
    if (!this.model.ownerContext) {
      throw 'ownerContext must be set.';
    }

    var callback = this.model.get('callback');
    if (callback) {
      callback.call(this.model.ownerContext, this);
    }
  }
});