var _ = require('underscore');
var Marionette = require('marionette');
var $ = require('jquery');

var FullScreenModalRegion = Marionette.Region.extend({
  el: '#fullscreen-modal-region',

  initialize: function() {
    _.bindAll(this, 'close', 'onKeypress');
    $(document).on('keyup', this.onKeypress);
  },

  onShow: function() {
    this.$el.addClass('shown');
    this.closeButtons = this.$el.find('.x-close');
    this.closeButtons.on('click', this.close);
  },

  onKeypress: function(event) {
    var view = this.currentView;
    if (!view || view.isClosed) {
      return;
    }
    var esc = 27;
    if (event.keyCode === esc) {
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
    window.setTimeout(_.bind(function() {
      // make sure we close the view were were intended to not some future modal.
      if (this.currentView === view) {
        Marionette.Region.prototype.close.apply(this, arguments);
      }
    }, this), 1000);
  },
});

module.exports = FullScreenModalRegion;