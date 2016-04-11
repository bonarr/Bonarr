const Marionette = require('marionette');
var $ = require('jquery');

const $body = $('body');

const region = Marionette.Region.extend({
  el: '#actionbar-region',

  onShow() {
    $body.addClass('actionbar-visible');
  },

  onEmpty() {
    $body.removeClass('actionbar-visible actionbar-extended');
  }
});

module.exports = region;
