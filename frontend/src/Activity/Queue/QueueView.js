const vent = require('vent');
const Marionette = require('marionette');
const tpl = require('./QueueView.hbs');

module.exports = Marionette.ItemView.extend({
  template: tpl,
  tagName: 'span',

  initialize(status) {
    this.status = status;
    this.listenTo(vent, 'server:queue/status', this._processSignalrMessage);
  },

  serializeData() {
    if (this.status) {
      let labelClass = 'label-info';

      if (this.status.errors) {
        labelClass = 'label-danger';
      } else if (this.status.warnings) {
        labelClass = 'label-warning';
      }

      return {
        count: this.status.count,
        labelClass
      };
    }
  },

  _processSignalrMessage({ action, resource }) {
    if (!this.isDestroyed) {
      this.status = resource;
      this.render();
    }
  }
});
