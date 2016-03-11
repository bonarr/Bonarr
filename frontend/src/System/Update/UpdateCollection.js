var Backbone = require('backbone');
var UpdateModel = require('./UpdateModel');

module.exports = Backbone.Collection.extend({
  url: window.Sonarr.ApiRoot + '/update',
  model: UpdateModel
});
