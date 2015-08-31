var vent = require('vent');
var AppLayout = require('../AppLayout');
var Marionette = require('marionette');
var RootFolderLayout = require('./RootFolders/RootFolderLayout');
var ExistingSeriesCollectionView = require('./Existing/AddExistingSeriesCollectionView');
var AddSeriesView = require('./AddSeriesView');
var ProfileCollection = require('../Profile/ProfileCollection');
var RootFolderCollection = require('./RootFolders/RootFolderCollection');
require('../Series/SeriesCollection');

module.exports = Marionette.Layout.extend({
  template: 'AddSeries/AddSeriesLayoutTemplate',

  regions: {
    workspace: '#add-series-workspace'
  },

  events: {
    'click .x-import': '_importSeries',
    'click .x-add-new': '_addSeries'
  },

  attributes: {
    id: 'add-series-screen'
  },

  initialize: function() {
    ProfileCollection.fetch();
    RootFolderCollection.fetch().done(function() {
      RootFolderCollection.synced = true;
    });

    this._showActionBar();
  },

  onShow: function() {
    this.workspace.show(new AddSeriesView());
  },

  _showActionBar: function() {
    var actions = {
      items: [
        {
          tooltip: 'Add new series',
          icon: 'icon-sonarr-new-series',
          callback: this._addSeries
        },
        {
          tooltip: 'Import existing series',
          icon: 'icon-sonarr-hdd',
          callback: this._importSeries
        }
      ]
    };

    vent.trigger(vent.Commands.OpenActionBarCommand, {
      parentView: this,
      actions: actions
    });
  },

  _folderSelected: function(options) {
    vent.trigger(vent.Commands.CloseFullscreenModal);

    this.workspace.show(new ExistingSeriesCollectionView({model: options.model}));
  },

  _importSeries: function() {
    this.rootFolderLayout = new RootFolderLayout();
    this.listenTo(this.rootFolderLayout, 'folderSelected', this._folderSelected);
    vent.trigger(vent.Commands.OpenFullscreenModal, this.rootFolderLayout);
  },

  _addSeries: function() {
    this.workspace.show(new AddSeriesView());
  }
});