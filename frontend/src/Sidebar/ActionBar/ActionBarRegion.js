const Marionette = require('marionette');
const $ = require('jquery');

const $body = $('body');

const ActionBarRegion = Marionette.Region.extend({
  el: '#actionbar-region',

  onShow() {
    $body.addClass('actionbar-visible');
  },

  onEmpty() {
    $body.removeClass('actionbar-visible actionbar-extended');
  }
});

module.exports = ActionBarRegion;
