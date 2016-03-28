var Marionette = require('marionette');
var TableView = require('Table/TableView');
var HealthRow = require('./HealthRow');
var HealthCollection = require('../../../Health/HealthCollection');
var HealthOkView = require('./HealthOkView');

module.exports = Marionette.LayoutView.extend({
  template: 'System/Status/Health/HealthLayoutTemplate',

  regions: {
    grid: '#x-health-grid'
  },

  headers: [
    {
      name: 'type',
      label: ''
    },
    {
      name: 'message',
      label: 'Message'
    },
    {
      name: 'link',
      label: 'Link'
    }
  ],

  initialize() {
    this.listenTo(HealthCollection, 'sync', this.render);
    HealthCollection.fetch();
  },

  onRender() {
    if (HealthCollection.length === 0) {
      this.grid.show(new HealthOkView());
    } else {
      this._showTable();
    }
  },

  _showTable() {
    this.grid.show(new TableView({
      headers: this.headers,
      collection: HealthCollection,
      className: 'table table-hover',
      childView: HealthRow
    }));
  }
});
