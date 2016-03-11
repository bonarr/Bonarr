var vent = require('vent');
var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: 'Settings/DownloadClient/Delete/DownloadClientDeleteView',

  events: {
    'click .x-confirm-delete': '_delete'
  },

  _delete() {
    this.model.destroy({
      wait: true,
      success() {
        vent.trigger(vent.Commands.CloseFullscreenModal);
      }
    });
  }
});
