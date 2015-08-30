var NzbDroneController = require('../Shared/NzbDroneController');
var AppLayout = require('../AppLayout');
var StatusLayout = require('./Status/StatusLayout');
var UpdateLayout = require('./Update/UpdateLayout');
var TaskLayout = require('./Task/TaskLayout');
var BackupLayout = require('./Backup/BackupLayout');
var LogLayout = require('./Logs/LogsLayout');

module.exports = NzbDroneController.extend({
    initialize : function() {
        this.route('system', this.status);
        this.route('system/status', this.status);
        this.route('system/updates', this.updates);
        this.route('system/tasks', this.tasks);
        this.route('system/backup', this.backup);
        this.route('system/logs', this.logs);

        NzbDroneController.prototype.initialize.apply(this, arguments);
    },

    status : function() {
        this.setTitle('Status');
        this.showMainRegion(new StatusLayout());
    },

    updates : function() {
        this.setTitle('Updates');
        this.showMainRegion(new UpdateLayout());
    },

    tasks : function() {
        this.setTitle('Tasks');
        this.showMainRegion(new TaskLayout());
    },

    backup : function() {
        this.setTitle('Backup');
        this.showMainRegion(new BackupLayout());
    },

    logs : function() {
        this.setTitle('Logs');
        this.showMainRegion(new LogLayout());
    }
});