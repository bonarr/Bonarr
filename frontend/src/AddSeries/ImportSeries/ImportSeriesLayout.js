var Marionette = require('marionette');
var tpl = require('./ImportSeriesLayout.hbs');

const EmptyView = Marionette.Layout.extend({
  template: tpl,

  initialize(options = {}) {
    this.term = options.term;
  }
});

module.exports = EmptyView;
