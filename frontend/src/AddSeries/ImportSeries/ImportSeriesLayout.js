var Marionette = require('marionette');
var reqres = require('reqres');
var tpl = require('./ImportSeriesLayout.hbs');

const EmptyView = Marionette.Layout.extend({
  template: tpl,

  initialize(options = {}) {
    this.term = options.term;
    reqres.request(reqres.SelectPath);
  }
});

module.exports = EmptyView;
