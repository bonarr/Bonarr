const SeriesIndexItemView = require('../SeriesIndexItemView');
const lazyImage = require('Behaviours/lazyImages');
const tpl = require('./SeriesOverviewItemView.hbs');

const SeriesOverviewItemView = SeriesIndexItemView.extend({
  template: tpl,
  behaviors: {
    lazyImage: {
      behaviorClass: lazyImage
    }
  }
});

module.exports = SeriesOverviewItemView;
