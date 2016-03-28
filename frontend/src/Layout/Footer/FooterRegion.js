var $ = require('jquery');
var _ = require('underscore');
var Marionette = require('marionette');

var region = Marionette.Region.extend({
  el: '#footer-region',

  initialize() {
    _.bindAll(this, '_resizeContent');

    this.$window = $(window);
    this.$contentWrapper = $('#content-section');

    this._debouncedResize = _.debounce(this._resizeContent, 200);
  },

  _resizeContent() {
    let height = 0;
    if (this.hasView()) {
      height = this.$el.height();
    }

    this.$contentWrapper.css('padding-bottom', height);
  },

  onShow() {
    this._resizeContent();
    this.listenTo(this.currentView, 'render', this._resizeContent);
    this.$window.on('resize', this._debouncedResize);
  },

  onEmpty() {
    this.stopListening(this._resizeContent);
    this.$window.off('resize');

    this._resizeContent();
  }
});

module.exports = region;
