var vent = require('vent');
var Marionette = require('marionette');

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
    var self = this;
    var deleteFiles = this.ui.deleteFiles.prop('checked');
    this.ui.indicator.show();

    this.model.destroy({
      data: { 'deleteFiles': deleteFiles },
      wait: true
    }).done(() => {
      vent.trigger(vent.Events.SeriesDeleted, { series: self.model });
      this.destroy();
    });
  },

  changeDeletedFiles() {
    var deleteFiles = this.ui.deleteFiles.prop('checked');

    if (deleteFiles) {
      this.ui.deleteFilesInfo.show();
    } else {
      this.ui.deleteFilesInfo.hide();
    }
  }
});
