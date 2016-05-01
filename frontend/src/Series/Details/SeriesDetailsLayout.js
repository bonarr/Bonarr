const $ = require('jquery');
const _ = require('underscore');
const vent = require('vent');
const reqres = require('reqres');
const Marionette = require('marionette');
const Backbone = require('backbone');
const seriesCollection = require('Series/seriesCollection');
const EpisodeCollection = require('Series/EpisodeCollection');
const EpisodeFileCollection = require('Series/EpisodeFileCollection');
const SeasonCollection = require('Series/SeasonCollection');
const SeasonCollectionView = require('./SeasonCollectionView');
const SeriesHeaderView = require('./SeriesHeaderView');
const CommandController = require('Commands/CommandController');
const LoadingView = require('Shared/LoadingView');
const EpisodeFileEditorLayout = require('EpisodeFile/Editor/EpisodeFileEditorLayout');
const NoEpisodesView = require('./NoEpisodesView');
const tpl = require('./SeriesDetails.hbs');

const SeriesDetailsLayout = Marionette.LayoutView.extend({
  template: tpl,

  regions: {
    header: '#series-header-region',
    seasons: '#series-seasons-region'
  },

  ui: {
    monitored: '.x-monitored',
    edit: '.x-edit',
    refresh: '.x-refresh',
    rename: '.x-rename',
    search: '.x-search',
    poster: '.x-series-poster'
  },

  events: {
    'click .x-monitored': 'onMonitoredClick'
  },

  initialize() {
    this.seriesCollection = seriesCollection;
    // this.seriesCollection.shadowCollection;

    const seriesId = this.model.id;

    this.seasonCollection = new SeasonCollection(this.model.get('seasons'));
    this.episodeCollection = new EpisodeCollection({ seriesId });
    this.episodeFileCollection = new EpisodeFileCollection({ seriesId });

    reqres.setHandler(reqres.Requests.GetEpisodeFileById, (episodeFileId) => {
      return this.episodeFileCollection.get(episodeFileId);
    });

    reqres.setHandler(reqres.Requests.GetAlternateNameBySeasonNumber, (_seriesId, seasonNumber) => {
      if (seriesId !== _seriesId) {
        return [];
      }

      return _.where(this.model.get('alternateTitles'), { seasonNumber });
    });

    this.listenTo(this.model, 'change:monitored', this._setMonitoredState);
    this.listenTo(this.model, 'remove', this.onSeriesRemoved);
    this.listenTo(vent, vent.Events.CommandComplete, this._commandComplete);

    this.listenTo(this.model, 'change', function(model, options) {
      if (options && options.changeSource === 'signalr') {
        this._refresh();
      }
    });

    this._showActionBar();
  },

  onShow() {
    this._showSeasons();
    this._setMonitoredState();
    this._showHeader();
  },

  onRender() {
    CommandController.bindToCommand({
      element: this.ui.refresh,
      command: {
        name: 'refreshSeries'
      }
    });
    CommandController.bindToCommand({
      element: this.ui.search,
      command: {
        name: 'seriesSearch'
      }
    });
    CommandController.bindToCommand({
      element: this.ui.rename,
      command: {
        name: 'renameFiles',
        seriesId: this.model.id,
        seasonNumber: -1
      }
    });
  },

  onDestroy() {
    reqres.removeHandler(reqres.Requests.GetEpisodeFileById);
  },

  onMonitoredClick() {
    const savePromise = this.model.save('monitored', !this.model.get('monitored'), { wait: true });
    this.ui.monitored.spinForPromise(savePromise);
  },

  _setMonitoredState() {
    const monitored = this.model.get('monitored');

    this.ui.monitored.removeAttr('data-idle-icon');
    this.ui.monitored.removeClass('fa-spin icon-sonarr-spinner');

    if (monitored) {
      this.ui.monitored.addClass('icon-sonarr-monitored');
      this.ui.monitored.removeClass('icon-sonarr-unmonitored');
      this.$el.removeClass('series-not-monitored');
    } else {
      this.ui.monitored.addClass('icon-sonarr-unmonitored');
      this.ui.monitored.removeClass('icon-sonarr-monitored');
      this.$el.addClass('series-not-monitored');
    }
  },

  onSeriesRemoved() {
    Backbone.history.navigate('/', { trigger: true });
  },

  _showSeasons() {
    this.seasons.show(new LoadingView());

    $.when(this.episodeCollection.fetch(), this.episodeFileCollection.fetch()).done(() => {
      if (!this.isDestroyed) {
        this._updateSeasons();
      }

      this.listenTo(this.episodeCollection, 'sync', this._updateSeasons);
    });
  },

  _showHeader() {
    this.header.show(new SeriesHeaderView({
      model: this.model,
      episodeFileCollection: this.episodeFileCollection
    }));
  },

  _commandComplete(options) {
    if (['renamefiles', 'refreshseries'].includes(options.command.get('name'))) {
      if (options.command.get('seriesId') === this.model.get('id')) {
        this._refresh();
      }
    }
  },

  _refresh() {
    this.seasonCollection.add(this.model.get('seasons'), { merge: true });
    this.episodeCollection.fetch();
    this.episodeFileCollection.fetch();

    this._setMonitoredState();
    this._showHeader();
  },

  _updateSeasons() {
    if (!this.showingSeasons && this.episodeCollection.length) {
      const seasonCollectionView = new SeasonCollectionView({
        collection: this.seasonCollection,
        episodeCollection: this.episodeCollection,
        series: this.model
      });

      this.showingSeasons = true;
      this.seasons.show(seasonCollectionView);
    } else if (!this.episodeCollection.length) {
      this.showingSeasons = false;
      this.seasons.show(new NoEpisodesView());
    }
  },

  onExpandClick() {
    this.model.trigger('seasons:expand');
  },

  onEditClick() {
    vent.trigger(vent.Commands.EditSeries, { series: this.model });
  },

  onDeleteClick() {
    vent.trigger(vent.Commands.DeleteSeries, { series: this.model });
  },

  onRenameClick() {
    vent.trigger(vent.Commands.ShowRenamePreview, { series: this.model });
  },

  onEditFileClick() {
    const view = new EpisodeFileEditorLayout({
      series: this.model,
      episodeCollection: this.episodeCollection
    });

    vent.trigger(vent.Commands.OpenFullscreenModal, view);
  },

  _showActionBar() {
    const actions = {
      items: [
        {
          tooltip: 'Update series info and scan disk',
          icon: 'icon-sonarr-refresh',
          command: 'refreshSeries',
          properties: {
            seriesId: this.model.id
          }
        },
        {
          tooltip: 'Search for monitored episodes in this series',
          icon: 'icon-sonarr-search',
          command: 'seriesSearch',
          properties: {
            seriesId: this.model.id
          }
        },
        {
          tooltip: 'Expand/Collapse all seasons',
          icon: 'icon-sonarr-expand',
          callback: this.onExpandClick
        },
        {
          tooltip: 'Preview rename for series',
          icon: 'icon-sonarr-rename',
          callback: this.onRenameClick
        },
        {
          tooltip: 'Modify episode files for this series',
          icon: 'icon-sonarr-episode-file',
          callback: this.onEditFileClick
        },
        {
          tooltip: 'Edit series',
          icon: 'icon-sonarr-edit',
          callback: this.onEditClick
        },
        {
          tooltip: `Delete ${this.model.get('title')}`,
          icon: 'icon-sonarr-delete-item',
          callback: this.onDeleteClick
        }
      ]
    };

    vent.trigger(vent.Commands.OpenActionBarCommand, {
      parentView: this,
      actions
    });
  }
});

module.exports = SeriesDetailsLayout;
