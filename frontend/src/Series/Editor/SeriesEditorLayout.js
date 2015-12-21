var vent = require('vent');
var Marionette = require('marionette');
var Backgrid = require('backgrid');
var EmptyView = require('../Index/EmptyView');
var SeriesCollection = require('../SeriesCollection');
var SeriesTitleCell = require('Cells/SeriesTitleCell');
var ProfileCell = require('Cells/ProfileCell');
var SeriesStatusCell = require('Cells/SeriesStatusCell');
var SeasonFolderCell = require('Cells/SeasonFolderCell');
var SelectAllCell = require('Cells/SelectAllCell');
var FooterView = require('./SeriesEditorFooterView');
require('Mixins/backbone.signalr.mixin');

module.exports = Marionette.Layout.extend({
  template: 'Series/Editor/SeriesEditorLayoutTemplate',

  regions: {
    seriesRegion: '#x-series-editor'
  },

  ui: {
    monitored: '.x-monitored',
    profiles: '.x-profiles',
    rootFolder: '.x-root-folder',
    selectedCount: '.x-selected-count'
  },

  events: {
    'click .x-save': '_updateAndSave',
    'change .x-root-folder': '_rootFolderChanged'
  },

  columns: [
    {
      name: '',
      cell: SelectAllCell,
      headerCell: 'select-all',
      sortable: false
    },
    {
      name: 'statusWeight',
      label: '',
      cell: SeriesStatusCell
    },
    {
      name: 'title',
      label: 'Title',
      cell: SeriesTitleCell,
      cellValue: 'this'
    },
    {
      name: 'profileId',
      label: 'Profile',
      cell: ProfileCell
    },
    {
      name: 'seasonFolder',
      label: 'Season Folder',
      cell: SeasonFolderCell
    },
    {
      name: 'path',
      label: 'Path',
      cell: 'string'
    }
  ],

  initialize: function() {
    this.seriesCollection = SeriesCollection.clone();
    this.seriesCollection.shadowCollection.bindSignalR();
    this.listenTo(this.seriesCollection, 'save', this.render);

    this._showActionBar();
  },

  onShow: function() {
    this._showTable();
  },

  onClose: function() {
    vent.trigger(vent.Commands.CloseControlPanel);
  },

  _showTable: function() {
    if (this.seriesCollection.shadowCollection.length === 0) {
      this.seriesRegion.show(new EmptyView());
      return;
    }

    this.columns[0].sortedCollection = this.seriesCollection;

    this.editorGrid = new Backgrid.Grid({
      collection: this.seriesCollection,
      columns: this.columns,
      className: 'table table-hover'
    });

    this.seriesRegion.show(this.editorGrid);
    this._showFooter();
  },

  _showActionBar: function() {
    var actions = {
      items: [
        {
          title: 'Update Library',
          icon: 'icon-sonarr-refresh',
          command: 'refreshseries',
          successMessage: 'Library was updated!',
          errorMessage: 'Library update failed!'
        }
      ]
    };

    var filteringOptions = {
      type: 'radio',
      storeState: true,
      menuKey: 'serieseditor.filterMode',
      defaultAction: 'all',
      items: [
        {
          key: 'all',
          title: 'All',
          icon: 'icon-sonarr-all'
        },
        {
          key: 'monitored',
          title: 'Monitored Only',
          icon: 'icon-sonarr-monitored',
        },
        {
          key: 'continuing',
          title: 'Continuing Only',
          icon: 'icon-sonarr-series-continuing'
        },
        {
          key: 'ended',
          title: 'Ended Only',
          icon: 'icon-sonarr-series-ended'
        }
      ]
    };

    vent.trigger(vent.Commands.OpenActionBarCommand, {
      parentView: this,
      collection: this.seriesCollection,
      actions: actions,
      filtering: filteringOptions
    });
  },

  _showFooter: function() {
    vent.trigger(vent.Commands.OpenControlPanel, new FooterView({
      editorGrid: this.editorGrid,
      collection: this.seriesCollection
    }));
  }
});