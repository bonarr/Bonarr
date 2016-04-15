const Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: 'Series/Delete/DeleteSeriesTemplate',

  events: {
    'click .x-confirm-delete': 'removeSeries',
    'change .x-delete-files': 'changeDeletedFiles'
  },

  triggers: {
    'click .x-close': 'destroy'
  },

  ui: {
    deleteFiles: '.x-delete-files',
    deleteFilesInfo: '.x-delete-files-info',
    indicator: '.x-indicator'
  },

  removeSeries() {
    const deleteFiles = this.ui.deleteFiles.prop('checked');
    this.ui.indicator.show();

    this.model.destroy({
      data: { deleteFiles },
      wait: true
    }).done(() => {
      this.destroy();
    });
  },

  changeDeletedFiles() {
    const deleteFiles = this.ui.deleteFiles.prop('checked');

    if (deleteFiles) {
      this.ui.deleteFilesInfo.show();
    } else {
      this.ui.deleteFilesInfo.hide();
    }
  }
});
