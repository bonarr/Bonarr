const Backbone = require('backbone');
const ButtonModel = require('./ButtonModel');

module.exports = Backbone.Collection.extend({
  model: ButtonModel
});
