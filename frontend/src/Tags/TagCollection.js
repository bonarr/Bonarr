var Backbone = require('backbone');
var TagModel = require('./TagModel');

var Collection = Backbone.Collection.extend({
  url: window.Sonarr.ApiRoot + '/tag',
  model: TagModel,

  comparator: function(model) {
    return model.get('label');
  }
});

module.exports = new Collection();
