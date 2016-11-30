const NzbDroneController = require('Shared/NzbDroneController');
const seriesCollection = require('./seriesCollection');
const SeriesIndexLayout = require('./Index/SeriesIndexLayout');
const SeriesDetailsLayout = require('./Details/SeriesDetailsLayout');

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
      console.warn(`Series ${query} not found.`, series);
      this.showNotFound();
    }
  }
});
