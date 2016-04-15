const Backbone = require('backbone');

const StatusModel = Backbone.Model.extend({
  url: '/system/status'
});

module.exports = new StatusModel();
