var Backbone = require('backbone');

var StatusModel = Backbone.Model.extend({
  url: window.Sonarr.ApiRoot + '/system/status'
});

module.exports = new StatusModel();
