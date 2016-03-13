var Backbone = require('backbone');

var StatusModel = Backbone.Model.extend({
  url: '/system/status'
});

module.exports = new StatusModel();
