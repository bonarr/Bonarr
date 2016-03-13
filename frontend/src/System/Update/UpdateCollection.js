var Backbone = require('backbone');
var UpdateModel = require('./UpdateModel');

module.exports = Backbone.Collection.extend({
  url: '/update',
  model: UpdateModel
});
