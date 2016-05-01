const _ = require('underscore');
const Marionette = require('marionette');
const vent = require('vent');
const PosterCollectionView = require('./Posters/SeriesPostersCollectionView');
const OverViewCollectionView = require('./Overview/SeriesOverviewCollectionView');
const TableCollectionView = require('./Table/SeriesTableLayout');
const EmptyView = require('./EmptyView');
const seriesCollection = require('../seriesCollection');
const FooterView = require('./FooterView');
const FooterModel = require('./FooterModel');
const tpl = require('./SeriesIndexLayout.hbs');

const SeriesIndexLayout = Marionette.LayoutView.extend({
  template: tpl,

  regions: {
    seriesRegion: '#x-series',
    footer: '#x-series-footer'
  },

  initialize() {
    // nothing yet
  },

  onShow() {
    this._showActionBar();
  },

  _showTable() {
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
    if (seriesCollection.length === 0) {
      this.seriesRegion.show(new EmptyView());
    } else {
      this.seriesRegion.show(view);
      this._showFooter();
    }
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

    const filteringOptions = {
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

    const viewOptions = {
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
    const footerModel = new FooterModel();
    const series = seriesCollection.models.length;
    let episodes = 0;
    let episodeFiles = 0;
    let ended = 0;
    let continuing = 0;
    let monitored = 0;

    _.each(seriesCollection.models, (model) => {
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
