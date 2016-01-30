var _ = require('underscore');
var $ = require('jquery');
var Marionette = require('marionette');
require('bootstrap');

const ModalRegion = Marionette.Region.extend({
  el: '#modal-region',
  backdrop: true,

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
      keyboard: true,
      backdrop: this.backdrop
    });
  },

  onClose() {
    this.$el.modal('hide');
    this.stopListening(this.currentView);
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
    this.close();
  }
});

module.exports = ModalRegion;
