var NzbDroneController = require('Shared/NzbDroneController');
var StatusLayout = require('./Status/StatusLayout');
var UpdateLayout = require('./Update/UpdateLayout');
var TaskLayout = require('./Task/TaskLayout');
var BackupLayout = require('./Backup/BackupLayout');
var LogLayout = require('./Logs/LogsLayout');

module.exports = NzbDroneController.extend({
  initialize() {
    this.route('system', this.status);
    this.route('system/status', this.status);
    this.route('system/updates', this.updates);
    this.route('system/tasks', this.tasks);
    this.route('system/backup', this.backup);
    this.route('system/logs', this.logs);

    NzbDroneController.prototype.initialize.apply(this, arguments);
  },

  status() {
    this.setTitle('Status');
    this.showMainRegion(new StatusLayout());
  },

  updates() {
    this.setTitle('Updates');
    this.showMainRegion(new UpdateLayout());
  },

  tasks() {
    this.setTitle('Tasks');
    this.showMainRegion(new TaskLayout());
  },

  backup() {
    this.setTitle('Backup');
    this.showMainRegion(new BackupLayout());
  },

  logs() {
    this.setTitle('Logs');
    this.showMainRegion(new LogLayout());
  }
});
