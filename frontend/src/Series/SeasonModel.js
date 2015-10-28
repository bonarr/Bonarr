var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  idAttribute: 'seasonNumber',
  
  defaults: {
    seasonNumber: 0
  }
});