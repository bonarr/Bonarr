const Marionette = require('marionette');
const tpl = require('./HealthOkView.hbs');

module.exports = Marionette.ItemView.extend({
  template: tpl
});
