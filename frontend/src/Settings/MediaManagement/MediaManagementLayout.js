var _ = require('underscore');
var $ = require('jquery');
var Marionette = require('marionette');
var SettingsLayoutBase = require('../SettingsLayoutBase');
var NamingView = require('./Naming/NamingView');
var SortingView = require('./Sorting/SortingView');
var FileManagementView = require('./FileManagement/FileManagementView');
var PermissionsView = require('./Permissions/PermissionsView');
var MediaManagementSettingsModel = require('./MediaManagementSettingsModel');
var NamingModel = require('./Naming/NamingModel');

module.exports = SettingsLayoutBase.extend({
  template: 'Settings/MediaManagement/MediaManagementLayoutTemplate',

  regions: {
    loading: '#loading-region',
    episodeNaming: '#episode-naming',
    sorting: '#sorting',
    fileManagement: '#file-management',
    permissions: '#permissions'
  },

  initialize() {
    this.model = new MediaManagementSettingsModel();
    this.namingModel = new NamingModel();
    SettingsLayoutBase.prototype.initialize.apply(this, arguments);
  },

  onRender() {
    var promise = $.when(this.model.fetch(), this.namingModel.fetch());

    promise.done(_.bind(function() {
      if (this.isClosed) {
        return;
      }

      this.episodeNaming.show(new NamingView({ model: this.namingModel }));
      this.sorting.show(new SortingView({ model: this.model }));
      this.fileManagement.show(new FileManagementView({ model: this.model }));
      this.permissions.show(new PermissionsView({ model: this.model }));
    }, this));
  }
});
