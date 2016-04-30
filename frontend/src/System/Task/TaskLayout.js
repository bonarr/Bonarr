const Marionette = require('marionette');
const TableView = require('Table/TableView');
const TaskRow = require('./TaskRow');
const TaskCollection = require('./TaskCollection');
const LoadingView = require('Shared/LoadingView');
const tpl = require('./TaskLayout.hbs');

module.exports = Marionette.LayoutView.extend({
  template: tpl,

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

    this.taskCollection;
  },

  onRender() {
    this.tasks.show(new LoadingView());

    this.taskCollection.fetch().done(() => this._showTasks());
  },

  _showTasks() {
    this.tasks.show(new TableView({
      headers: this.headers,
      collection: this.taskCollection,
      childView: TaskRow,
      className: 'table table-hover'
    }));
  }
});
