var SeriesIndexItemView = require('../SeriesIndexItemView');
var tpl = require('./SeriesPostersItemView.hbs');

module.exports = SeriesIndexItemView.extend({
  tagName: 'li',
  className: 'series-poster-item',
  template: tpl
});
