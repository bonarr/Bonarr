var Marionette = require('marionette');
var RootFolderCollectionView = require('./RootFolderCollectionView');
var RootFolderCollection = require('./RootFolderCollection');
var RootFolderModel = require('./RootFolderModel');
var LoadingView = require('Shared/LoadingView');
var AsValidatedView = require('Mixins/AsValidatedView');
require('Mixins/FileBrowser');

var Layout = Marionette.LayoutView.extend({
  template: 'AddSeries/RootFolders/RootFolderLayoutTemplate',

  ui: {
    pathInput: '.x-path'
  },

  regions: {
    currentDirs: '#current-dirs'
  },

  events: {
    'click .x-add': '_addFolder',
    'keydown .x-path input': '_keydown'
  },

  initialize() {
    this.collection = RootFolderCollection;
    this.rootfolderListView = new RootFolderCollectionView({ collection: RootFolderCollection });

    this.listenTo(this.rootfolderListView, 'childview:folderSelected', this._onFolderSelected);
    this.listenTo(RootFolderCollection, 'sync', this._showCurrentDirs);
  },

  onRender() {
    this.currentDirs.show(new LoadingView());

    if (RootFolderCollection.synced) {
      this._showCurrentDirs();
    }

    this.ui.pathInput.fileBrowser();
  },

  _onFolderSelected(options) {
    this.trigger('folderSelected', options);
  },

  _addFolder() {
    var self = this;

    var newDir = new RootFolderModel({
      Path: this.ui.pathInput.val()
    });

    this.bindToModelValidation(newDir);

    newDir.save().done(function() {
      RootFolderCollection.add(newDir);
      self.trigger('folderSelected', { model: newDir });
    });
  },

  _showCurrentDirs() {
    this.currentDirs.show(this.rootfolderListView);
  },

  _keydown(e) {
    if (e.keyCode !== 13) {
      return;
    }

    this._addFolder();
  }
});

var Layout = AsValidatedView.apply(Layout);

module.exports = Layout;
