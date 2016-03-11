var Marionette = require('marionette');

var region = Marionette.Region.extend({
  el: '#actionbar-region',

  onShow() {
    Marionette.$('body').addClass('actionbar-visible');
  },

  onClose() {
    Marionette.$('body').removeClass('actionbar-visible actionbar-extended');
  }
});

module.exports = region;
