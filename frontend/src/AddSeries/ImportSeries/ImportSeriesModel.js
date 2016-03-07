const Backbone = require('backbone');

const ImportSeriesModel = Backbone.Model.extend({
  isSelectable() {
    return this.get('selectedSeries');
  }
});

module.exports = ImportSeriesModel;
