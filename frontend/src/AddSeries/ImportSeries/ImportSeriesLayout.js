var Marionette = require('marionette');
var vent = require('vent');
var tpl = require('./ImportSeriesLayout.hbs');

const EmptyView = Marionette.Layout.extend({
  template: tpl,

  initialize(options = {}) {
    this.term = options.term;
    vent.trigger(vent.Commands.ShowFileBrowser, { path : `c:\\` });
  }
});

module.exports = EmptyView;
