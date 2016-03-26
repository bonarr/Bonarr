var $ = require('jquery');
var Marionette = require('marionette');

var region = Marionette.Region.extend({
  el: '#footer-region',

  initialize() {
    this.contentWrapper = $('#content-section');
  },

  _resizeContent() {
    const height = this.$el.height();
    this.contentWrapper.css('padding-bottom', height);
  },

  onShow() {
    this._resizeContent();
    this.listenTo(this.currentView, 'render', this._resizeContent);
  },

  onClose() {
    this.contentWrapper.css('padding-bottom', 0);
  }
});

module.exports = region;
