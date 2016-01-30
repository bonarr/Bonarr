var Backbone = require('backbone');
var SeriesCollection = require('Series/SeriesCollection');

module.exports = Backbone.Model.extend({
  //Hack to deal with Backbone 1.0's bug
  initialize() {
    this.url = function() {
      return this.collection.url + '/' + this.get('id');
    };
  },

  parse(model) {
    model.series = SeriesCollection.get(model.seriesId);
    return model;
  }
});