var NzbDroneCell = require('Cells/NzbDroneCell');
var CommandController = require('Commands/CommandController');

module.exports = NzbDroneCell.extend({
  className: 'execute-task-cell',

  events: {
    'click .x-execute': '_executeTask'
  },

  render() {
    this.$el.empty();

    var name = this.model.get('name');
    var task = this.model.get('taskName');

    this.$el.html('<i class="icon-sonarr-refresh icon-can-spin x-execute" title="Execute {{name}}"></i>'.format(name));

    CommandController.bindToCommand({
      element: this.$el.find('.x-execute'),
      command: { name: task }
    });

    return this;
  },

  _executeTask() {
    CommandController.execute(this.model.get('taskName'), { name: this.model.get('taskName') });
  }
});
