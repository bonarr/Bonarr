var Marionette = require('marionette');
var ListItemView = require('./SeriesOverviewItemView');

module.exports = Marionette.CollectionView.extend({
  itemView: ListItemView
});
