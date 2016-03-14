const Marionette = require('marionette');
const tpl = require('./NotFoundView.hbs');

module.exports = Marionette.ItemView.extend({
  template: tpl
});
