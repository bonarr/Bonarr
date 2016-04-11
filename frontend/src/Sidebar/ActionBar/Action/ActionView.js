const Backbone = require('backbone');
const Marionette = require('marionette');
const _ = require('underscore');
const CommandController = require('Commands/CommandController');
const tpl = require('./ActionView.hbs');

module.exports = Marionette.ItemView.extend({
  template: tpl,
  tagName: 'li',
  className: 'actionbar-list-item',

  events: {
    'click': 'onClick'
  },

  onRender() {
    if (this.model.get('active')) {
      this.$el.addClass('active');
      this.invokeCallback();
    }

    if (this.model.get('className')) {
      this.$el.addClass(this.model.get('className'));
    }

    if (this.model.get('tooltip')) {
      this.$el.attr('title', this.model.get('tooltip'));
      this.$el.data('container', 'body');
    }

    const command = this.model.get('command');

    if (command) {
      const properties = _.extend({ name: command }, this.model.get('properties'));

      CommandController.bindToCommand({
        command: properties,
        element: this.$el
      });
    }
  },

  onClick() {
    if (this.$el.hasClass('disabled')) {
      return;
    }

    this.invokeCallback();
    this.invokeRoute();
    this.invokeCommand();
  },

  invokeCommand() {
    const command = this.model.get('command');
    if (command) {
      CommandController.execute(command, this.model.get('properties'));
    }
  },

  invokeRoute() {
    const route = this.model.get('route');
    if (route) {
      Backbone.history.navigate(route, { trigger: true });
    }
  },

  invokeCallback() {
    const callback = this.model.get('callback');

    if (callback) {
      if (!this.model.ownerContext) {
        throw new Error('ownerContext must be set.');
      }

      callback.call(this.model.ownerContext, this);
    }
  }
});
