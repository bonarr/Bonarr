var SeriesIndexItemView = require('../SeriesIndexItemView');
var lazyImage = require('Behaviours/lazyImages');
var tpl = require('./SeriesPostersItemView.hbs');

module.exports = SeriesIndexItemView.extend({
  tagName: 'li',
  className: 'series-poster-item',
  template: tpl,
  behaviors: {
    lazyImage: {
      behaviorClass: lazyImage
    }
  }
});
