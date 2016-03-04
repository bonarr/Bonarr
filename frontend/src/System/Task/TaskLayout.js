var Marionette = require('marionette');
var TableView = require('Table/TableView');
var TaskRow = require('./TaskRow');
var TaskCollection = require('./TaskCollection');
var LoadingView = require('Shared/LoadingView');
require('Mixins/backbone.signalr.mixin');

module.exports = Marionette.Layout.extend({
  template: 'System/Task/TaskLayoutTemplate',

  regions: {
    tasks: '#x-tasks'
  },

  headers: [
    {
      name: 'name',
      label: 'Name'
    },
    {
      name: 'interval',
      label: 'Interval'
    },
    {
      name: 'lastExecution',
      label: 'Last Execution'
    },
    {
      name: 'nextExecution',
      label: 'Next Execution'
    },
    {
      name: 'actions',
      label: ''
    }
  ],

  initialize() {
    this.taskCollection = new TaskCollection();

    this.taskCollection.bindSignalR();
  },

  onRender() {
    this.tasks.show(new LoadingView());

    this.taskCollection.fetch().done(() => this._showTasks());
  },

  _showTasks() {
    this.tasks.show(new TableView({
      headers: this.headers,
      collection: this.taskCollection,
      itemView: TaskRow,
      className: 'table table-hover'
    }));
  }
});