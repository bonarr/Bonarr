const vent = require('vent');
const Backbone = require('backbone');
const Marionette = require('marionette');
const AddSeriesModal = require('./AddSeriesModal');
const tpl = require('./SearchResultItemView.hbs');
const lazyImage = require('Behaviours/lazyImages');
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

  templateHelpers() {
    return {
      isExisting: this.model.isExisting()
    };
  },

  onShow() {
    this.ui.overview.dotdotdot({
      height: 100,
      wrap: 'letter'
    });
  },

  onClick() {
    if (this.model.isExisting()) {
      Backbone.history.navigate(this.model.getRoute(), {
        trigger: true
      });
    } else {
      vent.trigger(vent.Commands.OpenFullscreenModal, new AddSeriesModal({
        model: this.model
      }));
    }
  }
});

module.exports = SearchResultItemView;
