var Backbone = require('backbone');
var DiskSpaceModel = require('./DiskSpaceModel');

module.exports = Backbone.Collection.extend({
  url: '/diskspace',
  model: DiskSpaceModel
});
