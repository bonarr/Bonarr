const _ = require('underscore');
const vent = require('vent');
const Marionette = require('marionette');
const Backgrid = require('backgrid');
const CutoffUnmetCollection = require('./CutoffUnmetCollection');
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
  template: 'Wanted/Cutoff/CutoffUnmetLayoutTemplate',

  regions: {
    cutoff: '#x-cutoff-unmet',
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
    this.collection = new CutoffUnmetCollection();

    this.listenTo(this.collection, 'sync', this._showTable);
    this._showActionBar();
  },

  onShow() {
    this.cutoff.show(new LoadingView());
    this.collection.fetch();
  },

  _showTable() {
    this.cutoffGrid = new Backgrid.Grid({
      columns: this.columns,
      collection: this.collection,
      className: 'table table-hover'
    });

    this.cutoff.show(this.cutoffGrid);

    this.pager.show(new GridPager({
      columns: this.columns,
      collection: this.collection
    }));
  },

  _showActionBar() {
    const actions = {
      items: [
        {
          tooltip: 'Search Selected',
          icon: 'icon-sonarr-search',
          callback: this._searchSelected,
          className: 'x-search-selected'
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
    const selected = this.cutoffGrid.getSelectedModels();

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
  }
});
