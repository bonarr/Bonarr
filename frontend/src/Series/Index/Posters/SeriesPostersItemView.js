var SeriesIndexItemView = require('../SeriesIndexItemView');

module.exports = SeriesIndexItemView.extend({
  tagName: 'li',
  className: 'series-poster-item',
  template: 'Series/Index/Posters/SeriesPostersItemViewTemplate',

  initialize: function() {},

  posterHoverAction: function() {
    //this.ui.controls.slideToggle();
    //this.ui.title.slideToggle();
  }
});