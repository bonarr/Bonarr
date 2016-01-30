var _ = require('underscore');
var $ = require('jquery');
var Config = require('Config');
var Marionette = require('marionette');
var moment = require('moment');
require('Mixins/FileBrowser');

module.exports = Marionette.ItemView.extend({
  template: 'ManualImport/Folder/SelectFolderViewTemplate',

  ui: {
    path: '.x-path',
    buttons: '.x-button'
  },

  events: {
    'click .x-manual-import': '_manualImport',
    'click .x-automatic-import': '_automaticImport',
    'change .x-path': '_updateButtons',
    'keyup .x-path': '_updateButtons',
    'click .x-recent-folder': '_selectRecentFolder'
  },

  initialize() {
    this.templateHelpers = {
      recentFolders: Config.getValueJson('manualimport.recentfolders', [])
    };
  },

  onRender() {
    this.ui.path.fileBrowser();
    this._updateButtons();
  },

  path() {
    return this.ui.path.val();
  },

  _manualImport() {
    var path = this.ui.path.val();

    if (path) {
      this._setRecentFolders(path);
      this.trigger('manualImport', { folder: path });
    }
  },

  _automaticImport() {
    var path = this.ui.path.val();

    if (path) {
      this._setRecentFolders(path);
      this.trigger('automaticImport', { folder: path });
    }
  },

  _updateButtons() {
    if (this.ui.path.val()) {
      this.ui.buttons.removeAttr('disabled');
    } else {
      this.ui.buttons.attr('disabled', 'disabled');
    }
  },

  _selectRecentFolder(e) {
    var path = $(e.target).closest('tr').data('path');
    this.ui.path.val(path);
    this.ui.path.trigger('change');
  },

  _setRecentFolders(path) {
    var recentFolders = Config.getValueJson('manualimport.recentfolders', []);

    recentFolders = _.filter(recentFolders, function(folder) {
      return folder.path.toLowerCase() !== path.toLowerCase();
    });

    recentFolders.unshift({ path: path, lastUsed: moment.utc().toISOString() });

    Config.setValueJson('manualimport.recentfolders', _.take(recentFolders, 5));
  }
});
