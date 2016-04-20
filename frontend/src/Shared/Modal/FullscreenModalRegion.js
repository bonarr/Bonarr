var _ = require('underscore');
var $ = require('jquery');
var Marionette = require('marionette');

const EscKeyCode = 27;
const $window = $(window);

const FullScreenModalRegion = Marionette.Region.extend({
  el: '#fullscreen-modal-region',

  initialize() {
    _.bindAll(this, 'destroy', 'onKeypress', 'resizeBody');
    $(document).on('keyup', this.onKeypress);
    const debouncedResize = _.debounce(this.resizeBody, 200);
    $window.resize(debouncedResize);
  },

  destroy() {
    if (this.$el) {
      this.$el.removeClass('shown');
    }
    this.destroyButtons = null;

    var view = this.currentView;
    if (!view || view.isDestroyed) {
      return;
    }
    // give animation time to finish before killing the html
    this.destroyTimeout = window.setTimeout(() => {
      // make sure we destroy the view we intended to not some future modal.
      if (this.currentView === view) {
        Marionette.Region.prototype.destroy.apply(this, arguments);
      }
    }, 1000);
  },

  resizeBody() {
    const view = this.currentView;
    if (!view || view.isDestroyed) {
      return;
    }

    const windowHeight = $window.height();
    const maxHeight = windowHeight - 190;

    this.$el.find('.fullscreen-modal-body').css('max-height', `${maxHeight}px`);
  },

  onShow() {
    window.clearTimeout(this.destroyTimeout);

    this.$el.addClass('shown');
    this.destroyButtons = this.$el.find('.x-close');
    this.destroyButtons.on('click', this.destroy);

    this.resizeBody();
    this.listenToOnce(this.currentView, 'destroy', this.onViewClose);
  },

  onKeypress(event) {
    const view = this.currentView;

    if (!view || view.isDestroyed) {
      return;
    }

    if (event.keyCode === EscKeyCode) {
      const $target = $(event.target);

      if ($target.is('select:focus')) {
        $target.blur();
      } else {
        this.destroy();
      }

      event.stopImmediatePropagation();
      event.preventDefault();
    }
  },

  onViewClose() {
    this.destroy();
    this.stopListening(this.currentView);
  }
});

module.exports = FullScreenModalRegion;
