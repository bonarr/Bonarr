var vent = require('vent');
var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: 'Settings/Profile/Delay/Delete/DelayProfileDeleteView',

  events: {
    'click .x-confirm-delete': '_delete'
  },

  _delete() {
    var collection = this.model.collection;

    this.model.destroy({
      wait: true,
      success() {
        vent.trigger(vent.Commands.CloseFullscreenModal);
      }
    });
  }
});
