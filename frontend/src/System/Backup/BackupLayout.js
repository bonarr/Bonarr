var vent = require('vent');
var Marionette = require('marionette');
var Backgrid = require('backgrid');
var BackupCollection = require('./BackupCollection');
var RelativeDateCell = require('Cells/RelativeDateCell');
var BackupFilenameCell = require('./BackupFilenameCell');
var BackupTypeCell = require('./BackupTypeCell');
var EmptyView = require('./BackupEmptyView');
var LoadingView = require('Shared/LoadingView');

module.exports = Marionette.Layout.extend({
  template: 'System/Backup/BackupLayoutTemplate',

  regions: {
    backups: '#x-backups'
  },

  columns: [
    {
      name: 'type',
      label: '',
      sortable: false,
      cell: BackupTypeCell
    },
    {
      name: 'this',
      label: 'Name',
      sortable: false,
      cell: BackupFilenameCell
    },
    {
      name: 'time',
      label: 'Time',
      sortable: false,
      cell: RelativeDateCell
    }
  ],

  leftSideButtons: {
    type: 'default',
    storeState: false,
    collapse: false,
    items: [
      {
        title: 'Backup',
        icon: 'icon-sonarr-file-text',
        command: 'backup',
        properties: { type: 'manual' },
        successMessage: 'Database and settings were backed up successfully',
        errorMessage: 'Backup Failed!'
      }
    ]
  },

  initialize() {
    this.backupCollection = new BackupCollection();

    this.listenTo(this.backupCollection, 'sync', this._showBackups);
    this.listenTo(vent, vent.Events.CommandComplete, this._commandComplete);
    this._showActionBar();
  },

  onRender() {
    this.backups.show(new LoadingView());

    this.backupCollection.fetch();
  },

  _showBackups() {
    if (this.backupCollection.length === 0) {
      this.backups.show(new EmptyView());
    } else {
      this.backups.show(new Backgrid.Grid({
        columns: this.columns,
        collection: this.backupCollection,
        className: 'table table-hover'
      }));
    }
  },

  _showActionBar() {
    var actions = {
      items: [
        {
          tooltip: 'Backup',
          icon: 'icon-sonarr-file-text',
          command: 'backup',
          properties: { type: 'manual' },
          successMessage: 'Database and settings were backed up successfully',
          errorMessage: 'Backup Failed!'
        }
      ]
    };

    vent.trigger(vent.Commands.OpenActionBarCommand, {
      parentView: this,
      actions: actions
    });
  },

  _commandComplete(options) {
    if (options.command.get('name') === 'backup') {
      this.backupCollection.fetch();
    }
  }
});