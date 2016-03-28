var vent = require('vent');
var Marionette = require('marionette');
var QueueCollection = require('./QueueCollection');
var tpl = require('./QueueView.hbs');

module.exports = Marionette.ItemView.extend({
  tagName: 'span',
  template: tpl,

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
        labelClass: labelClass
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
