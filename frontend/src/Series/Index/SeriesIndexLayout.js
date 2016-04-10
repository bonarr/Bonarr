var _ = require('underscore');
var Marionette = require('marionette');
var vent = require('vent');
var PosterCollectionView = require('./Posters/SeriesPostersCollectionView');
var OverViewCollectionView = require('./Overview/SeriesOverviewCollectionView');
var TableCollectionView = require('./Table/SeriesTableLayout');
var EmptyView = require('./EmptyView');
var SeriesCollection = require('../SeriesCollection');
var RelativeDateCell = require('Cells/RelativeDateCell');
var SeriesTitleCell = require('Cells/SeriesTitleCell');
var ProfileCell = require('Cells/ProfileCell');
var EpisodeProgressCell = require('Cells/EpisodeProgressCell');
var SeriesActionsCell = require('Cells/SeriesActionsCell');
var SeriesStatusCell = require('Cells/SeriesStatusCell');
var FooterView = require('./FooterView');
var FooterModel = require('./FooterModel');
var tpl = require('./SeriesIndexLayout.hbs');
require('Mixins/backbone.signalr.mixin');
require('Mixins/backbone.signalr.mixin');

const SeriesIndexLayout = Marionette.LayoutView.extend({
  template: tpl,

  regions: {
    seriesRegion: '#x-series',
    footer: '#x-series-footer'
  },

  columns: [
    {
      name: 'statusWeight',
      label: '',
      cell: SeriesStatusCell
    },
    {
      name: 'title',
      label: 'Title',
      cell: SeriesTitleCell,
      cellValue: 'this',
      sortValue: 'sortTitle'
    },
    {
      name: 'profileId',
      label: 'Profile',
      cell: ProfileCell
    },
    {
      name: 'network',
      label: 'Network',
      cell: 'string'
    },
    {
      name: 'nextAiring',
      label: 'Next Airing',
      cell: RelativeDateCell
    },
    {
      name: 'seasonCount',
      label: 'Seasons',
      cell: 'integer'
    },
    {
      name: 'percentOfEpisodes',
      label: 'Episodes',
      cell: EpisodeProgressCell,
      className: 'episode-progress-cell'
    },
    {
      name: 'this',
      label: '',
      sortable: false,
      cell: SeriesActionsCell
    }
  ],

  initialize() {
    // nothing yet
  },

  onShow() {
    this._showActionBar();
  },

  _showTable() {
    // const view = new Backgrid.Grid({
    //   collection: this.collection,
    //   columns: this.columns,
    //   className: 'table table-hover'
    // });

    const view = new TableCollectionView({
      collection: this.collection
    });

    this._renderView(view);
  },

  _showOverView() {
    const view = new OverViewCollectionView({
      collection: this.collection
    });

    this._renderView(view);
  },

  _showPosters() {
    const view = new PosterCollectionView({
      collection: this.collection
    });

    this._renderView(view);
  },

  _renderView(view) {
    if (SeriesCollection.length === 0) {
      this.seriesRegion.show(new EmptyView());
    } else {
      this.seriesRegion.show(view);
      this._showFooter();
    }
  },

  _fetchCollection() {
    // do nothing?
  },

  _showActionBar() {
    const actions = {
      items: [
        {
          tooltip: 'RSS Sync',
          icon: 'icon-sonarr-rss',
          command: 'rsssync',
          errorMessage: 'RSS Sync Failed!'
        },
        {
          tooltip: 'Update Library',
          icon: 'icon-sonarr-refresh',
          command: 'refreshseries',
          successMessage: 'Library was updated!',
          errorMessage: 'Library update failed!'
        }
      ]
    };

    const sortingOptions = {
      items: [
        {
          title: 'Title',
          name: 'title'
        },
        {
          title: 'Profile',
          name: 'profileId'
        },
        {
          title: 'Network',
          name: 'network'
        },
        {
          title: 'Next Airing',
          name: 'nextAiring'
        },
        {
          title: 'Number of Seasons',
          name: 'seasonCount'
        },
        {
          title: 'Number of Episodes',
          name: 'percentOfEpisodes'
        }
      ]
    };

    var filteringOptions = {
      type: 'radio',
      storeState: true,
      menuKey: 'series.filterMode',
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

    var viewOptions = {
      type: 'radio',
      storeState: true,
      menuKey: 'seriesViewMode',
      defaultAction: 'listView',
      items: [
        {
          key: 'posterView',
          title: '',
          tooltip: 'Posters',
          icon: 'icon-sonarr-view-poster',
          callback: this._showPosters
        },
        {
          key: 'listView',
          title: '',
          tooltip: 'Overview List',
          icon: 'icon-sonarr-view-list',
          callback: this._showOverView
        },
        {
          key: 'tableView',
          title: '',
          tooltip: 'Table',
          icon: 'icon-sonarr-view-table',
          callback: this._showTable
        }
      ]
    };

    vent.trigger(vent.Commands.OpenActionBarCommand, {
      parentView: this,
      collection: this.collection,
      actions,
      views: viewOptions,
      filtering: filteringOptions,
      sorting: sortingOptions
    });
  },

  _showFooter() {
    var footerModel = new FooterModel();
    var series = SeriesCollection.models.length;
    var episodes = 0;
    var episodeFiles = 0;
    var ended = 0;
    var continuing = 0;
    var monitored = 0;

    _.each(SeriesCollection.models, (model) => {
      episodes += model.get('episodeCount');
      episodeFiles += model.get('episodeFileCount');

      if (model.get('status') === 'ended') {
        ended++;
      } else {
        continuing++;
      }

      if (model.get('monitored')) {
        monitored++;
      }
    });

    footerModel.set({
      series,
      ended,
      continuing,
      monitored,
      unmonitored: series - monitored,
      episodes,
      episodeFiles
    });

    this.footer.show(new FooterView({ model: footerModel }));
  }
});

module.exports = SeriesIndexLayout;
