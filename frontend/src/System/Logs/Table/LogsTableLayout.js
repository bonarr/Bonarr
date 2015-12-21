var vent = require('vent');
var Marionette = require('marionette');
var Backgrid = require('backgrid');
var LogTimeCell = require('./LogTimeCell');
var LogLevelCell = require('./LogLevelCell');
var LogRow = require('./LogRow');
var GridPager = require('Shared/Grid/Pager');
var LogCollection = require('../LogsCollection');
var LoadingView = require('Shared/LoadingView');
require('jQuery/jquery.spin');

module.exports = Marionette.Layout.extend({
  template: 'System/Logs/Table/LogsTableLayoutTemplate',

  regions: {
    grid: '#x-grid',
    pager: '#x-pager'
  },

  attributes: {
    id: 'logs-screen'
  },

  columns: [
    {
      name: 'level',
      label: '',
      sortable: true,
      cell: LogLevelCell
    },
    {
      name: 'logger',
      label: 'Component',
      sortable: true,
      cell: Backgrid.StringCell.extend({
        className: 'log-logger-cell'
      })
    },
    {
      name: 'message',
      label: 'Message',
      sortable: false,
      cell: Backgrid.StringCell.extend({
        className: 'log-message-cell'
      })
    },
    {
      name: 'time',
      label: 'Time',
      cell: LogTimeCell
    }
  ],

  initialize: function() {
    this.collection = new LogCollection();

    this.listenTo(this.collection, 'sync', this._showTable);
    this.listenTo(vent, vent.Events.CommandComplete, this._commandComplete);

    this._showActionBar();
  },

  onRender: function() {
    this.grid.show(new LoadingView());
  },

  _showTable: function() {
    this.grid.show(new Backgrid.Grid({
      row: LogRow,
      columns: this.columns,
      collection: this.collection,
      className: 'table table-hover'
    }));

    this.pager.show(new GridPager({
      columns: this.columns,
      collection: this.collection
    }));
  },

  _showActionBar: function() {
    var actions = {
      type: 'default',
      storeState: false,
      items: [
        {
          tooltip: 'Refresh',
          icon: 'icon-sonarr-refresh',
          callback: this._refreshTable
        },
        {
          tooltip: 'Clear Logs',
          icon: 'icon-sonarr-clear',
          command: 'clearLog'
        }
      ]
    };

    var filteringOptions = {
      type: 'radio',
      storeState: true,
      menuKey: 'logs.filterMode',
      defaultAction: 'all',
      items: [
        {
          key: 'all',
          title: 'All',
          icon: 'icon-sonarr-all'
        },
        {
          key: 'info',
          title: 'Info',
          icon: 'icon-sonarr-log-info'
        },
        {
          key: 'warn',
          title: 'Warn',
          icon: 'icon-sonarr-log-warn'
        },
        {
          key: 'error',
          title: 'Error',
          icon: 'icon-sonarr-log-error'
        }
      ]
    };

    vent.trigger(vent.Commands.OpenActionBarCommand, {
      parentView: this,
      collection: this.collection,
      actions: actions,
      filtering: filteringOptions
    });
  },

  _refreshTable: function(buttonContext) {
    this.collection.state.currentPage = 1;
    var promise = this.collection.fetch({ reset: true });

    if (buttonContext) {
      buttonContext.ui.icon.spinForPromise(promise);
    }
  },

  _commandComplete: function(options) {
    if (options.command.get('name') === 'clearlog') {
      this._refreshTable();
    }
  }
});