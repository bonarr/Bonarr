var _ = require('underscore');
var Marionette = require('marionette');
var $ = require('jquery');

const EscKeyCode = 27;

const FullScreenModalRegion = Marionette.Region.extend({
  el: '#fullscreen-modal-region',

  initialize: function() {
    _.bindAll(this, 'close', 'onKeypress');
    $(document).on('keyup', this.onKeypress);
  },

  onShow: function() {
    clearTimeout(this.closeTimeout);

    this.$el.addClass('shown');
    this.closeButtons = this.$el.find('.x-close');
    this.closeButtons.on('click', this.close);

    this.listenToOnce(this.currentView, 'close', this.onViewClose);
  },

  onKeypress: function(event) {
    var view = this.currentView;
    if (!view || view.isClosed) {
      return;
    }

    if (event.keyCode === EscKeyCode) {
      this.close();
      event.stopPropagation();
      event.preventDefault();
    }
  },

  close: function() {
    this.$el.removeClass('shown');
    this.closeButtons = null;

    var view = this.currentView;
    if (!view || view.isClosed) {
      return;
    }
    // give animation time to finish before killing the html
    this.closeTimeout = window.setTimeout(() => {
      // make sure we close the view were were intended to not some future modal.
      if (this.currentView === view) {
        Marionette.Region.prototype.close.apply(this, arguments);
      }
    }, 1000);
  },

  onViewClose: function() {
    this.close();
    this.stopListening(this.currentView);
  }
});

module.exports = FullScreenModalRegion;
