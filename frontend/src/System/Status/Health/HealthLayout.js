const Marionette = require('marionette');
const TableView = require('Table/TableView');
const healthCollection = require('Health/healthCollection');
const HealthRow = require('./HealthRow');
const HealthOkView = require('./HealthOkView');
const tpl = require('./HealthLayout.hbs');

module.exports = Marionette.LayoutView.extend({
  template: tpl,

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
    this.listenTo(healthCollection, 'sync', this.render);
    healthCollection.fetch();
  },

  onRender() {
    if (healthCollection.length === 0) {
      this.grid.show(new HealthOkView());
    } else {
      this._showTable();
    }
  },

  _showTable() {
    this.grid.show(new TableView({
      headers: this.headers,
      collection: healthCollection,
      className: 'table table-hover',
      childView: HealthRow
    }));
  }
});
