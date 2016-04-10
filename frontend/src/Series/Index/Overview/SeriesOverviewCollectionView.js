var Marionette = require('marionette');
var SeriesOverviewItemView = require('./SeriesOverviewItemView');

module.exports = Marionette.CollectionView.extend({
  childView: SeriesOverviewItemView
});
