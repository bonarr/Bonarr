var vent = require('vent');
var Marionette = require('marionette');
var SeriesCollection = require('Series/SeriesCollection');
var AddSeriesModal = require('./AddSeriesModal');
var tpl = require('./SearchResultItemView.hbs');
var $ = require('jquery');

require('jquery.dotdotdot');
require('jquery.lazyload');

const SearchResultItemView = Marionette.ItemView.extend({
  template: tpl,

  ui: {
    overview: '.x-overview',
    lazyImage: 'img.lazy'
  },

  events: {
    'click': 'onClick'
  },

  initialize() {
    this.listenTo(this.model, 'change', this.render);
  },

  onShow() {
    this.ui.overview.dotdotdot({
      height: 100,
      wrap: 'letter'
    });

    this.ui.lazyImage.lazyload({
      threshold: 200,
      container: $('.content-wrapper')
    });
  },

  onClick() {
    var existingSeries = SeriesCollection.findWhere({
      tvdbId: this.model.get('tvdbId')
    });

    if (!existingSeries) {
      vent.trigger(vent.Commands.OpenFullscreenModal, new AddSeriesModal({
        model: this.model
      }));
    }
  }
});

module.exports = SearchResultItemView;
