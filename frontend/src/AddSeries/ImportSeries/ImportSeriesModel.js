const Backbone = require('backbone');

const ImportSeriesModel = Backbone.Model.extend({
  isSelectable() {
    const selectedSeries = this.get('selectedSeries');
    return selectedSeries && !selectedSeries.isExisting();
  }
});

module.exports = ImportSeriesModel;
