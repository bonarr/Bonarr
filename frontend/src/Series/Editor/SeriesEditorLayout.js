const vent = require('vent');
const Marionette = require('marionette');
const Backgrid = require('backgrid');
const EmptyView = require('./EmptyView');
const seriesCollection = require('../seriesCollection');
const SeriesTitleCell = require('Cells/SeriesTitleCell');
const ProfileCell = require('Cells/ProfileCell');
const SeriesStatusCell = require('Cells/SeriesStatusCell');
const SeasonFolderCell = require('Cells/SeasonFolderCell');
const SelectAllCell = require('Cells/SelectAllCell');
const FooterView = require('./SeriesEditorFooterView');
const tpl = require('./SeriesEditorLayout.hbs');

module.exports = Marionette.LayoutView.extend({
  template: tpl,

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

  initialize() {
    this.seriesCollection = seriesCollection;
    // this.seriesCollection = seriesCollection.clone();
    // this.seriesCollection.shadowCollection;
    this.listenTo(this.seriesCollection, 'save', this.render);

    this._showActionBar();
  },

  onShow() {
    this._showTable();
  },

  _showTable() {
    if (this.seriesCollection.length === 0) {
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

  _showActionBar() {
    const actions = {
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

    const filteringOptions = {
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
          icon: 'icon-sonarr-monitored'
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
      actions,
      filtering: filteringOptions
    });
  },

  _showFooter() {
    vent.trigger(vent.Commands.OpenFooter, new FooterView({
      editorGrid: this.editorGrid,
      collection: this.seriesCollection
    }));
  }
});
