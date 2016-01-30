var _ = require('underscore');
var Marionette = require('marionette');
var Backgrid = require('backgrid');
var vent = require('vent');
var $ = require('jquery');
var PosterCollectionView = require('./Posters/SeriesPostersCollectionView');
var ListCollectionView = require('./Overview/SeriesOverviewCollectionView');
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
require('jquery.lazyload');

module.exports = Marionette.Layout.extend({
  template: tpl,

  regions: {
    seriesRegion: '#x-series',
    footer: '#x-series-footer'
  },

  ui: {
    lazyImage: 'img.lazy'
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

  initialize: function() {
    this.seriesCollection =  SeriesCollection.viewCollection;
    this._showActionBar();
  },

  onShow: function() {
    this._showActionBar();

    this.$('img.lazy').lazyload({
      threshold: 200,
      container: $('.content-wrapper')
    });
  },

  _showTable: function() {
    this.currentView = new Backgrid.Grid({
      collection: this.seriesCollection,
      columns: this.columns,
      className: 'table table-hover'
    });

    this._renderView();
  },

  _showList: function() {
    this.currentView = new ListCollectionView({
      collection: this.seriesCollection
    });

    this._renderView();
  },

  _showPosters: function() {
    this.currentView = new PosterCollectionView({
      collection: this.seriesCollection
    });

    this._renderView();
  },

  _renderView: function() {
    if (SeriesCollection.length === 0) {
      this.seriesRegion.show(new EmptyView());
    } else {
      this.seriesRegion.show(this.currentView);
      this._showFooter();
    }
  },

  _fetchCollection: function() {},

  _showActionBar: function() {
    var actions = {
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

    var sortingOptions = {
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
          callback: this._showList
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
      collection: this.seriesCollection,
      actions: actions,
      views: viewOptions,
      filtering: filteringOptions,
      sorting: sortingOptions
    });
  },

  _showFooter: function() {
    var footerModel = new FooterModel();
    var series = SeriesCollection.models.length;
    var episodes = 0;
    var episodeFiles = 0;
    var ended = 0;
    var continuing = 0;
    var monitored = 0;

    _.each(SeriesCollection.models, function(model) {
      episodes += model.get('episodeCount');
      episodeFiles += model.get('episodeFileCount');

      if (model.get('status').toLowerCase() === 'ended') {
        ended++;
      } else {
        continuing++;
      }

      if (model.get('monitored')) {
        monitored++;
      }
    });

    footerModel.set({
      series: series,
      ended: ended,
      continuing: continuing,
      monitored: monitored,
      unmonitored: series - monitored,
      episodes: episodes,
      episodeFiles: episodeFiles
    });

    this.footer.show(new FooterView({ model: footerModel }));
  }
});
