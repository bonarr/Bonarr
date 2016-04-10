var Marionette = require('marionette');
var SeriesPostersItemView = require('./SeriesPostersItemView');

module.exports = Marionette.CollectionView.extend({
  className: 'series-posters',
  childView: SeriesPostersItemView
});
