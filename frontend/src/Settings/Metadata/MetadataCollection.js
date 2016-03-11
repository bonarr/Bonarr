var Backbone = require('backbone');
var MetadataModel = require('./MetadataModel');

module.exports = Backbone.Collection.extend({
  model: MetadataModel,
  url: window.Sonarr.ApiRoot + '/metadata'
});
