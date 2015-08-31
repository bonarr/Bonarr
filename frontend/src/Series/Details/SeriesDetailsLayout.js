var $ = require('jquery');
var _ = require('underscore');
var vent = require('vent');
var reqres = require('../../reqres');
var Marionette = require('marionette');
var Backbone = require('backbone');
var SeriesCollection = require('../SeriesCollection');
var EpisodeCollection = require('../EpisodeCollection');
var EpisodeFileCollection = require('../EpisodeFileCollection');
var SeasonCollection = require('../SeasonCollection');
var SeasonCollectionView = require('./SeasonCollectionView');
var SeriesHeaderView = require('./SeriesHeaderView');
var CommandController = require('../../Commands/CommandController');
var LoadingView = require('../../Shared/LoadingView');
var EpisodeFileEditorLayout = require('../../EpisodeFile/Editor/EpisodeFileEditorLayout');
require('../../Mixins/backbone.signalr.mixin');

module.exports = Marionette.Layout.extend({
  itemViewContainer: '.x-series-seasons',
  template: 'Series/Details/SeriesDetailsTemplate',

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

  initialize: function() {
    this.seriesCollection = SeriesCollection.clone();
    this.seriesCollection.shadowCollection.bindSignalR();

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

  onShow: function() {
    this._showSeasons();
    this._setMonitoredState();
    this._showHeader();

    this.onEditClick();
  },

  onRender: function() {
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

  onClose: function() {
    reqres.removeHandler(reqres.Requests.GetEpisodeFileById);
  },

  onMonitoredClick: function() {
    var savePromise = this.model.save('monitored', !this.model.get('monitored'), { wait: true });
    this.ui.monitored.spinForPromise(savePromise);
  },

  _setMonitoredState: function() {
    var monitored = this.model.get('monitored');

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

  onSeriesRemoved: function() {
    Backbone.history.navigate('/', { trigger: true });
  },

  _showSeasons: function() {
    var self = this;

    this.seasons.show(new LoadingView());

    this.seasonCollection = new SeasonCollection(this.model.get('seasons'));
    this.episodeCollection = new EpisodeCollection({ seriesId: this.model.id }).bindSignalR();
    this.episodeFileCollection = new EpisodeFileCollection({ seriesId: this.model.id }).bindSignalR();

    reqres.setHandler(reqres.Requests.GetEpisodeFileById, function(episodeFileId) {
      return self.episodeFileCollection.get(episodeFileId);
    });

    reqres.setHandler(reqres.Requests.GetAlternateNameBySeasonNumber, function(seriesId, seasonNumber) {
      if (self.model.get('id') !== seriesId) {
        return [];
      }

      return _.where(self.model.get('alternateTitles'), { seasonNumber: seasonNumber });
    });

    $.when(this.episodeCollection.fetch(), this.episodeFileCollection.fetch()).done(function() {
      var seasonCollectionView = new SeasonCollectionView({
        collection: self.seasonCollection,
        episodeCollection: self.episodeCollection,
        series: self.model
      });

      if (!self.isClosed) {
        self.seasons.show(seasonCollectionView);
      }
    });
  },

  _showHeader: function() {
    this.header.show(new SeriesHeaderView({
      model: this.model,
      episodeFileCollection: this.episodeFileCollection
    }));
  },

  _commandComplete: function(options) {
    if (options.command.get('name') === 'renamefiles') {
      if (options.command.get('seriesId') === this.model.get('id')) {
        this._refresh();
      }
    }
  },

  _refresh: function() {
    this.seasonCollection.add(this.model.get('seasons'), { merge: true });
    this.episodeCollection.fetch();
    this.episodeFileCollection.fetch();

    this._setMonitoredState();
    this._showHeader();
  },

  onEditClick: function() {
    vent.trigger(vent.Commands.EditSeries, { series: this.model });
  },

  onDeleteClick: function() {
    vent.trigger(vent.Commands.DeleteSeries, { series: this.model });
  },

  onRenameClick: function() {
    vent.trigger(vent.Commands.ShowRenamePreview, { series: this.model });
  },

  onEditFileClick: function() {
    var view = new EpisodeFileEditorLayout({
      series: this.model,
      episodeCollection: this.episodeCollection
    });

    vent.trigger(vent.Commands.OpenFullscreenModal, view);
  },

  _showActionBar: function() {
    var actions = {
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
          tooltip: 'Search for all episodes in this series',
          icon: 'icon-sonarr-search',
          command: 'seriesSearch',
          properties: {
            seriesId: this.model.id
          }
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
          tooltip: 'Delete ' + this.model.get('title'),
          icon: 'icon-sonarr-delete-item',
          callback: this.onDeleteClick
        }
      ]
    };

    vent.trigger(vent.Commands.OpenActionBarCommand, {
      parentView: this,
      actions: actions
    });
  },
});