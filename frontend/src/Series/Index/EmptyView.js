var Marionette = require('marionette');
var tpl = require('./EmptyView.hbs');

module.exports = Marionette.CompositeView.extend({
  template: tpl
});
