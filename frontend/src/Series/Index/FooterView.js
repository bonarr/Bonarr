var Marionette = require('marionette');
var tpl = require('./FooterView.hbs');

module.exports = Marionette.CompositeView.extend({
  template: tpl
});
