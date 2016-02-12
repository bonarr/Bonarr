var Marionette = require('marionette');
var CommandController = require('Commands/CommandController');

module.exports = Marionette.ItemView.extend({
  template: 'System/Update/UpdateItemViewTemplate',

  events: {
    'click .x-install-update': '_installUpdate'
  },

  _installUpdate() {
    CommandController.execute('applicationUpdate');
  }
});