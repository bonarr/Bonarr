var Marionette = require('marionette');
var statusModel = require('../../statusModel');

module.exports = Marionette.ItemView.extend({
  template: 'System/Status/About/AboutViewTemplate',

  initialize() {
    this.model = statusModel;
  }
});
