var Marionette = require('marionette');
var tpl = require('./EmptyView.hbs');

module.exports = Marionette.ItemView.extend({
  template: tpl,

  initialize(options) {
    options = options || {};
    this.term = options.term;
  },

  serializeData() {
    return { term: this.term };
  }
});
