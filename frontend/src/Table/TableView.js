const Marionette = require('marionette');
const tpl = require('./TableView.hbs');

const TableView = Marionette.CompositeView.extend({
  tagName: 'table',
  className: 'table',
  template: tpl,
  itemViewContainer: 'tbody',

  initialize(options = {}) {
    this.headers = options.headers;
  },

  serializeData() {
    return {
      headers: this.headers
    };
  }

});

module.exports = TableView;
