var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: 'AddSeries/RootFolders/RootFolderItemViewTemplate',
  className: 'recent-folder',
  tagName: 'tr',

  initialize() {
    this.listenTo(this.model, 'change', this.render);
  },

  events: {
    'click .x-delete': 'removeFolder',
    'click .x-folder': 'folderSelected'
  },

  removeFolder() {
    var self = this;

    this.model.destroy().success(function() {
      self.close();
    });
  },

  folderSelected() {
    this.trigger('folderSelected', this.model);
  }
});
