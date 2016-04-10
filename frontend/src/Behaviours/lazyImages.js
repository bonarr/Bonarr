const $ = require('jquery');
const Marionette = require('backbone.marionette');
const _ = require('underscore');
require('jquery.lazyload');

const $containerWrapper = $('#content-wrapper');

const lazyImage = Marionette.Behavior.extend({
  defaults: {
    threshold: 200
  },

  ui: {
    lazyImages: 'img.lazy'
  },

  onRender() {
    _.defer(() => {
      this.ui.lazyImages.lazyload({
        threshold: this.options.threshold,
        container: $containerWrapper
      });
    });
  }
});

module.exports = lazyImage;
