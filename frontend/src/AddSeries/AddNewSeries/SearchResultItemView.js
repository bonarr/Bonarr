var vent = require('vent');
var Marionette = require('marionette');
var AddSeriesModal = require('./AddSeriesModal');
var tpl = require('./SearchResultItemView.hbs');
var lazyImage = require('Behaviours/lazyImages');
require('jquery.dotdotdot');

const SearchResultItemView = Marionette.ItemView.extend({
  template: tpl,

  behaviors: {
    lazyImage: {
      behaviorClass: lazyImage
    }
  },

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
  },

  onClick() {
    if (!this.model.isExisting()) {
      vent.trigger(vent.Commands.OpenFullscreenModal, new AddSeriesModal({
        model: this.model
      }));
    }
  }
});

module.exports = SearchResultItemView;
