var Marionette = require('marionette');
var tpl = require('./EmptyView.hbs');

const EmptyView = Marionette.ItemView.extend({
  template: tpl,

  initialize(options = {}) {
    this.term = options.term;
  },
  serializeData() {
    return { term: this.term };
  }
});

module.exports = EmptyView;
