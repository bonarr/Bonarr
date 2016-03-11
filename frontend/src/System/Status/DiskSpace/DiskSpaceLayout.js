var vent = require('vent');
var Marionette = require('marionette');
var TableView = require('Table/TableView');
var DiskSpaceRow = require('./DiskSpaceRow');
var DiskSpaceCollection = require('./DiskSpaceCollection');
var LoadingView = require('Shared/LoadingView');

module.exports = Marionette.Layout.extend({
  template: 'System/Status/DiskSpace/DiskSpaceLayoutTemplate',

  regions: {
    grid: '#x-grid'
  },

  headers: [
    {
      name: 'path',
      label: 'Location'
    },
    {
      name: 'freeSpace',
      label: 'Free Space'
    },
    {
      name: 'totalSpace',
      label: 'Total Space'
    }
  ],

  initialize() {
    this.collection = new DiskSpaceCollection();
    this.listenTo(this.collection, 'sync', this._showTable);
  },

  onRender() {
    this.grid.show(new LoadingView());
  },

  onShow() {
    this.collection.fetch();
  },

  _showTable() {
    this.grid.show(new TableView({
      headers: this.headers,
      collection: this.collection,
      className: 'table table-hover',
      itemView: DiskSpaceRow
    }));
  }
});
