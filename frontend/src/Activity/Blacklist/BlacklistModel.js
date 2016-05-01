var Backbone = require('backbone');
var seriesCollection = require('Series/seriesCollection');

module.exports = Backbone.Model.extend({
  // Hack to deal with Backbone 1.0's bug
  initialize() {
    this.url = function() {
      return this.collection.url + '/' + this.get('id');
    };
  },

  parse(model) {
    model.series = seriesCollection.get(model.seriesId);
    return model;
  }
});
