const Marionette = require('marionette');
const SeriesPostersItemView = require('./SeriesPostersItemView');

module.exports = Marionette.CollectionView.extend({
  className: 'series-posters',
  childView: SeriesPostersItemView
});
