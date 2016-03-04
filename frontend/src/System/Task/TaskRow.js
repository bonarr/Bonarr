const Marionette = require('marionette');
const TableRowMixin = require('Table/TableRowMixin');
const moment = require('moment');
const CommandController = require('Commands/CommandController');
const tpl = require('./TaskRow.hbs');

const TaskRow = Marionette.ItemView.extend({

  className: 'task-row',
  template: tpl,

  ui: {
    execute: '.x-execute'
  },

  events: {
    'click .x-execute': 'onExecuteClick'
  },

  initialize() {
    this.listenTo(this.model, 'change', this.render);
  },

  templateHelpers() {
    return {
      executeNow: moment().isAfter(this.model.get('nextExecution')),
      duration: moment.duration(this.model.get('interval'), 'minutes').humanize().replace(/an?(?=\s)/, '1')
    };
  },

  onRender() {
    CommandController.bindToCommand({
      element: this.ui.execute,
      command: { name: this.model.get('taskName') }
    });
  },

  onExecuteClick() {
    CommandController.execute(this.model.get('taskName'), { name: this.model.get('taskName') });
  }

});

TableRowMixin(TaskRow);

module.exports = TaskRow;
