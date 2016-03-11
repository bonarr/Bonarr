var vent = require('vent');
var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: 'Settings/Profile/DeleteProfileView',

  events: {
    'click .x-confirm-delete': '_removeProfile'
  },

  _removeProfile() {
    this.model.destroy({ wait: true }).done(function() {
      vent.trigger(vent.Commands.CloseFullscreenModal);
    });
  }
});
