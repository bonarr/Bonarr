var Backbone = require('backbone');
var SeasonModel = require('./SeasonModel');

module.exports = Backbone.Collection.extend({
  model: SeasonModel,

  comparator(season) {
    return -season.get('seasonNumber');
  }
});