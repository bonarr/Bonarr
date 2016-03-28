var Marionette = require('marionette');
var PosterItemView = require('./SeriesPostersItemView');
var tpl = require('./SeriesPostersCollectionView.hbs');

module.exports = Marionette.CompositeView.extend({
  childView: PosterItemView,
  childViewContainer: '#x-series-posters',
  template: tpl
});
