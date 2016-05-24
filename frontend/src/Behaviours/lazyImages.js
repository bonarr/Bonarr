const Marionette = require('backbone.marionette');
const _ = require('underscore');
require('jquery.lazyload');

const lazyImages = Marionette.Behavior.extend({
  defaults: {
    threshold: 200
  },

  ui: {
    lazyImages: 'img.lazy'
  },

  onRender() {
    _.defer(() => {
      if (this.view.isDestroyed) {
        return;
      }
      this.ui.lazyImages.lazyload({
        threshold: this.options.threshold
        // container: $containerWrapper
      });
    });
  }
});

module.exports = lazyImages;
