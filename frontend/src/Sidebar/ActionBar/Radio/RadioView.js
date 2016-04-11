const Marionette = require('marionette');
const Config = require('Config');

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

  initialize() {
    this.storageKey = this.model.get('menuKey') + ':' + this.model.get('key');
  },

  onRender() {
    if (this.model.get('active')) {
      this.$el.addClass('active');
      this.invokeCallback();
    }

    if (this.model.get('tooltip')) {
      this.$el.attr('title', this.model.get('tooltip'));
    }
  },

  onClick() {
    if (this.model.get('active')) {
      return;
    }

    Config.setValue(this.model.get('menuKey'), this.model.get('key'));
    this.invokeCallback();
    this.trigger('click');
  },

  invokeCallback() {
    if (!this.model.ownerContext) {
      throw 'ownerContext must be set.';
    }

    const callback = this.model.get('callback');
    if (callback) {
      callback.call(this.model.ownerContext, this);
    }
  }
});
