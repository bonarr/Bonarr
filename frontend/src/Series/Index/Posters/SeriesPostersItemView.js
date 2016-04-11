const SeriesIndexItemView = require('../SeriesIndexItemView');
const lazyImage = require('Behaviours/lazyImages');
const tpl = require('./SeriesPostersItemView.hbs');

const SeriesPosterItemView = SeriesIndexItemView.extend({
  tagName: 'li',
  className: 'series-poster-item',
  template: tpl,
  behaviors: {
    lazyImage: {
      behaviorClass: lazyImage
    }
  }
});

module.exports = SeriesPosterItemView;
