var _ = require('underscore');
var $ = require('jquery');
var Marionette = require('marionette');
require('bootstrap');

const EscKeyCode = 27;

const ModalRegion = Marionette.Region.extend({
  el: '#modal-region',
  backdrop: true,

  initialize() {
    _.bindAll(this, 'onKeypress');
    $(document).on('keyup', this.onKeypress);
  },

  getEl(selector) {
    var $el = $(selector);
    $el.on('hide.bs.modal', _.bind(this.onBootstrapHide, this));
    $el.on('show.bs.modal', _.bind(this.onBootstrapShow, this));
    return $el;
  },

  onShow() {
    this.$el.css('z-index', '1060');

    this.currentView.$el.addClass('modal-dialog');

    this.listenToOnce(this.currentView, 'close', this.onViewClose);

    this.bootstrapModal = this.$el.modal({
      show: true,
      keyboard: false,
      backdrop: this.backdrop
    });
  },

  onBootstrapShow() {
    $('.modal-backdrop:last').css('z-index', 1059);
    this.trigger('modal:afterShow');
    this.currentView.trigger('modal:afterShow');
  },

  onBootstrapHide() {
    this.close();
  },

  onViewClose() {
    this.$el.modal('hide');
    this.stopListening(this.currentView);
  },

  onKeypress(event) {
    var view = this.currentView;

    if (!view || view.isClosed) {
      return;
    }

    if (event.keyCode === EscKeyCode) {
      this.close();
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }
});

module.exports = ModalRegion;
