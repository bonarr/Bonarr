var Backbone = require('backbone');
var DiskSpaceModel = require('./DiskSpaceModel');

module.exports = Backbone.Collection.extend({
  url: window.Sonarr.ApiRoot + '/diskspace',
  model: DiskSpaceModel
});
