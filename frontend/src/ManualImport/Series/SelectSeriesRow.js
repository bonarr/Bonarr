var Marionette = require('marionette');
var tpl = require('./SelectSeriesRow.hbs');

module.exports = Marionette.ItemView.extend({
  template: tpl,

  className: 'select-row select-series-row',

  events: {
    'click': 'onClick'
  },

  onClick() {
    this.model.collection.trigger('modelselected', this.model);
  }
});
