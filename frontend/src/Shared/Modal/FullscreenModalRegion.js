var _ = require('underscore');
var $ = require('jquery');
var Marionette = require('marionette');

const EscKeyCode = 27;

const FullScreenModalRegion = Marionette.Region.extend({
  el: '#fullscreen-modal-region',

  initialize() {
    _.bindAll(this, 'close', 'onKeypress', 'resizeBody');
    this.debouncedResize = _.debounce(this.resizeBody, 200);
    $(document).on('keyup', this.onKeypress);
    $(window).resize(_.debounce(this.debouncedResize, 100));
  },

  close() {
    if (this.$el) {
      this.$el.removeClass('shown');
    }
    this.closeButtons = null;

    var view = this.currentView;
    if (!view || view.isClosed) {
      return;
    }
    // give animation time to finish before killing the html
    this.closeTimeout = window.setTimeout(() => {
      // make sure we close the view we intended to not some future modal.
      if (this.currentView === view) {
        Marionette.Region.prototype.close.apply(this, arguments);
      }
    }, 1000);
  },

  resizeBody() {
    var view = this.currentView;
    if (!view || view.isClosed) {
      return;
    }

    this.$el.find('.fullscreen-modal-body').css('max-height', ($(window).height() - 190) + 'px');
  },

  onShow() {
    window.clearTimeout(this.closeTimeout);

    this.$el.addClass('shown');
    this.closeButtons = this.$el.find('.x-close');
    this.closeButtons.on('click', this.close);

    this.resizeBody();
    this.listenToOnce(this.currentView, 'close', this.onViewClose);
  },

  onKeypress(event) {
    var view = this.currentView;

    if (!view || view.isClosed) {
      return;
    }

    if (event.keyCode === EscKeyCode) {
      const $target = $(event.target);

      if ($target.is('select:focus')) {
        $target.blur();
      } else {
        this.close();
      }

      event.stopImmediatePropagation();
      event.preventDefault();
    }
  },

  onViewClose() {
    this.close();
    this.stopListening(this.currentView);
  }
});

module.exports = FullScreenModalRegion;
