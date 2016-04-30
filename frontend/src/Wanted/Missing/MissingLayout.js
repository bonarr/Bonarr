const $ = require('jquery');
const _ = require('underscore');
const vent = require('vent');
const Marionette = require('marionette');
const Backgrid = require('backgrid');
const MissingCollection = require('./MissingCollection');
const SelectAllCell = require('Cells/SelectAllCell');
const SeriesTitleCell = require('Cells/SeriesTitleCell');
const EpisodeNumberCell = require('Cells/EpisodeNumberCell');
const EpisodeTitleCell = require('Cells/EpisodeTitleCell');
const RelativeDateCell = require('Cells/RelativeDateCell');
const EpisodeStatusCell = require('Cells/EpisodeStatusCell');
const GridPager = require('Shared/Grid/Pager');
const LoadingView = require('Shared/LoadingView');
const Messenger = require('Shared/Messenger');
const CommandController = require('Commands/CommandController');

require('backgrid.selectall');

module.exports = Marionette.LayoutView.extend({
  template: 'Wanted/Missing/MissingLayoutTemplate',

  regions: {
    missing: '#x-missing',
    pager: '#x-pager'
  },

  ui: {
    searchSelectedButton: '.btn i.icon-sonarr-search'
  },

  columns: [
    {
      name: '',
      cell: SelectAllCell,
      headerCell: 'select-all',
      sortable: false
    },
    {
      name: 'series',
      label: 'Series Title',
      cell: SeriesTitleCell,
      sortValue: 'series.sortTitle'
    },
    {
      name: 'this',
      label: 'Episode',
      cell: EpisodeNumberCell,
      sortable: false
    },
    {
      name: 'this',
      label: 'Episode Title',
      cell: EpisodeTitleCell,
      sortable: false
    },
    {
      name: 'airDateUtc',
      label: 'Air Date',
      cell: RelativeDateCell
    },
    {
      name: 'status',
      label: 'Status',
      cell: EpisodeStatusCell,
      sortable: false
    }
  ],

  initialize() {
    this.collection = new MissingCollection();

    this.listenTo(this.collection, 'sync', this._showTable);
    this._showActionBar();
  },

  onShow() {
    this.missing.show(new LoadingView());
    this.collection.fetch();
  },

  _showTable() {
    this.missingGrid = new Backgrid.Grid({
      columns: this.columns,
      collection: this.collection,
      className: 'table table-hover'
    });

    this.missing.show(this.missingGrid);

    this.pager.show(new GridPager({
      columns: this.columns,
      collection: this.collection
    }));
  },

  _showActionBar() {
    const actions = {
      type: 'default',
      collapse: true,
      items: [
        {
          tooltip: 'Search Selected',
          icon: 'icon-sonarr-search',
          callback: this._searchSelected
        },
        {
          tooltip: 'Search All Missing',
          icon: 'icon-sonarr-search',
          callback: this._searchMissing
        },
        {
          title: 'Toggle Selected',
          icon: 'icon-sonarr-monitored',
          tooltip: 'Toggle monitored status of selected',
          callback: this._toggleMonitoredOfSelected
        },
        {
          tooltip: 'Rescan Drone Factory Folder',
          icon: 'icon-sonarr-refresh',
          command: 'downloadedepisodesscan',
          properties: { sendUpdates: true }
        },
        {
          tooltip: 'Manual Import',
          icon: 'icon-sonarr-search-interactive',
          callback: this._manualImport
        }
      ]
    };

    const filteringOptions = {
      storeState: false,
      menuKey: 'wanted.filterMode',
      defaultAction: 'monitored',
      items: [
        {
          key: 'monitored',
          title: 'Monitored Only',
          icon: 'icon-sonarr-monitored'
        },
        {
          key: 'unmonitored',
          title: 'Unmonitored Only',
          icon: 'icon-sonarr-unmonitored'
        }
      ]
    };

    vent.trigger(vent.Commands.OpenActionBarCommand, {
      parentView: this,
      collection: this.collection,
      actions,
      filtering: filteringOptions
    });
  },

  _setFilter(buttonContext) {
    const mode = buttonContext.model.get('key');
    this.collection.state.currentPage = 1;
    const promise = this.collection.setFilterMode(mode);
    if (buttonContext) {
      buttonContext.ui.icon.spinForPromise(promise);
    }
  },

  _searchSelected() {
    const selected = this.missingGrid.getSelectedModels();
    if (selected.length === 0) {
      Messenger.show({
        type: 'error',
        message: 'No episodes selected'
      });
      return;
    }

    const ids = _.pluck(selected, 'id');
    CommandController.execute('episodeSearch', {
      name: 'episodeSearch',
      episodeIds: ids
    });
  },

  _searchMissing() {
    if (window.confirm(`Are you sure you want to search for ${this.collection.state.totalRecords} missing episodes?
        One API request to each indexer will be used for each episode. This cannot be stopped once started.`)) {
      CommandController.execute('missingEpisodeSearch', { name: 'missingEpisodeSearch' });
    }
  },

  _toggleMonitoredOfSelected() {
    const selected = this.missingGrid.getSelectedModels();

    if (selected.length === 0) {
      Messenger.show({
        type: 'error',
        message: 'No episodes selected'
      });
      return;
    }

    const promises = [];

    _.each(selected, (episode) => {
      episode.set('monitored', !episode.get('monitored'));
      promises.push(episode.save());
    });

    $.when(promises).done(() => {
      this.collection.fetch();
    });
  },

  _manualImport() {
    vent.trigger(vent.Commands.ShowManualImport);
  }
});
