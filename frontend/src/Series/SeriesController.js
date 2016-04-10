var NzbDroneController = require('Shared/NzbDroneController');
var seriesCollection = require('./seriesCollection');
var SeriesIndexLayout = require('./Index/SeriesIndexLayout');
var SeriesDetailsLayout = require('./Details/SeriesDetailsLayout');

module.exports = NzbDroneController.extend({
  initialize() {
    this.route('', this.series);
    this.route('series', this.series);
    this.route('series/:query', this.seriesDetails);

    NzbDroneController.prototype.initialize.apply(this, arguments);
  },

  series() {
    this.setTitle('Sonarr');
    this.showMainRegion(new SeriesIndexLayout({
      collection: seriesCollection
    }));
  },

  seriesDetails(query) {
    const series = seriesCollection.findWhere({ titleSlug: query });

    if (series) {
      this.setTitle(series.get('title'));
      this.showMainRegion(new SeriesDetailsLayout({ model: series }));
    } else {
      this.showNotFound();
    }
  }
});
