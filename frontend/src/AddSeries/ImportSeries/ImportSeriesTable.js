var Marionette = require('marionette');
var reqres = require('reqres');
var tpl = require('./ImportSeriesLayout.hbs');
var TableView = require('Table/TableView');

const EmptyView = TableView.extend({
  template: tpl,

  headrs: [
    {
      name: 'type',
      label: ''
    },
    {
      name: 'name',
      label: 'Name'
    }
  ],

  initialize(options = {}) {
    this.term = options.term;
  },

  onStart() {
    var promise = reqres.request(reqres.SelectPath);
    promise.done(this.onPathSelected);
  },

  onPathSelected(options) {

  }
});

module.exports = EmptyView;
