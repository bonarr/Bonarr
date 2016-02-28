var vent = require('vent');
var Marionette = require('marionette');
var TableView = require('Table/TableView');
var EpisodeRow = require('./EpisodeRow');
var ToggleCell = require('Cells/EpisodeMonitoredCell');
var EpisodeTitleCell = require('Cells/EpisodeTitleCell');
var RelativeDateCell = require('Cells/RelativeDateCell');
var EpisodeStatusCell = require('Cells/EpisodeStatusCell');
var EpisodeActionsCell = require('Cells/EpisodeActionsCell');
var EpisodeNumberCell = require('./EpisodeNumberCell');
var EpisodeWarningCell = require('./EpisodeWarningCell');
var CommandController = require('Commands/CommandController');
var EpisodeFileEditorLayout = require('../../EpisodeFile/Editor/EpisodeFileEditorLayout');
var moment = require('moment');
var _ = require('underscore');
var Messenger = require('Shared/Messenger');
var tpl = require('./SeasonLayout.hbs');

module.exports = Marionette.Layout.extend({
  template: tpl,

  ui: {
    seasonSearch: '.x-season-search',
    seasonMonitored: '.x-season-monitored',
    seasonRename: '.x-season-rename',
    panel: '.x-panel'
  },

  events: {
    'click .x-season-episode-file-editor': '_openEpisodeFileEditor',
    'click .x-season-monitored': '_seasonMonitored',
    'click .x-season-search': '_seasonSearch',
    'click .x-season-rename': '_seasonRename',
    'click .x-toggle': '_showHideEpisodes',
    'dblclick .x-heading': '_showHideEpisodes'
  },

  regions: {
    episodes: '.x-episodes'
  },

  headers: [
    {
      name: 'monitored',
      label: ''
    },
    {
      name: 'episodeNumber',
      label: '#'
    },
    {
      name: 'title',
      label: 'Title'
    },
    {
      name: 'airDateUtc',
      label: 'Air Date'
    },
    {
      name: 'status',
      label: 'Status',
      className: 'episode-status'
    },
    {
      name: 'actions',
      label: ''
    }
  ],

  columns: [
    {
      name: 'monitored',
      label: '',
      cell: ToggleCell,
      trueClass: 'icon-sonarr-monitored',
      falseClass: 'icon-sonarr-unmonitored',
      tooltip: 'Toggle monitored status',
      sortable: false
    },
    {
      name: 'episodeNumber',
      label: '#',
      cell: EpisodeNumberCell
    },
    {
      name: 'this',
      label: '',
      cell: EpisodeWarningCell,
      sortable: false,
      className: 'episode-warning-cell'
    },
    {
      name: 'this',
      label: 'Title',
      hideSeriesLink: true,
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
    },
    {
      name: 'this',
      label: '',
      cell: EpisodeActionsCell,
      sortable: false
    }
  ],

  templateHelpers() {
    var episodeCount = this.episodeCollection.filter(function(episode) {
      return episode.get('hasFile') || episode.get('monitored') && moment(episode.get('airDateUtc')).isBefore(moment());
    }).length;

    var episodeFileCount = this.episodeCollection.where({ hasFile: true }).length;
    var percentOfEpisodes = 100;

    if (episodeCount > 0) {
      percentOfEpisodes = episodeFileCount / episodeCount * 100;
    }

    return {
      episodeCount: episodeCount,
      episodeFileCount: episodeFileCount,
      percentOfEpisodes: percentOfEpisodes
    };
  },

  initialize(options) {
    if (!options.episodeCollection) {
      throw 'episodeCollection is required';
    }

    this.series = options.series;
    this.fullEpisodeCollection = options.episodeCollection;
    this.episodeCollection = this.fullEpisodeCollection.bySeason(this.model.get('seasonNumber'));
    this._updateEpisodeCollection();

    this.showingEpisodes = this._shouldShowEpisodes();

    this.listenTo(this.model, 'change:monitored', this.onMonitoredChange);
    this.listenTo(this.episodeCollection, 'sync', this._refreshEpisodes);
    this.listenTo(this.fullEpisodeCollection, 'sync', this._refreshEpisodes);
  },

  onRender() {
    if (this.showingEpisodes) {
      this._showEpisodes();
    }

    this._setSeasonMonitoredState();

    CommandController.bindToCommand({
      element: this.ui.seasonSearch,
      command: {
        name: 'seasonSearch',
        seriesId: this.series.id,
        seasonNumber: this.model.get('seasonNumber')
      }
    });

    CommandController.bindToCommand({
      element: this.ui.seasonRename,
      command: {
        name: 'renameFiles',
        seriesId: this.series.id,
        seasonNumber: this.model.get('seasonNumber')
      }
    });
  },

  _seasonSearch() {
    CommandController.execute('seasonSearch', {
      name: 'seasonSearch',
      seriesId: this.series.id,
      seasonNumber: this.model.get('seasonNumber')
    });
  },

  _seasonRename() {
    vent.trigger(vent.Commands.ShowRenamePreview, {
      series: this.series,
      seasonNumber: this.model.get('seasonNumber')
    });
  },

  _seasonMonitored() {
    if (!this.series.get('monitored')) {

      Messenger.show({
        message: 'Unable to change monitored state when series is not monitored',
        type: 'error'
      });

      return;
    }

    var name = 'monitored';
    this.model.set(name, !this.model.get(name));
    this.series.toggleSeasonMonitored(this.model.get('seasonNumber'));

    var savePromise = this.series.save().always(this._afterSeasonMonitored.bind(this));

    this.ui.seasonMonitored.spinForPromise(savePromise);
  },

  _afterSeasonMonitored() {
    _.each(this.episodeCollection.models, (episode) => {
      episode.set({ monitored: this.model.get('monitored') });
    });
  },

  _setSeasonMonitoredState() {
    var monitored = this.model.get('monitored');
    this.ui.seasonMonitored.toggleClass('icon-sonarr-monitored', monitored);
    this.ui.seasonMonitored.toggleClass('icon-sonarr-unmonitored', !monitored);

    if (monitored) {
      this.ui.seasonMonitored.prop('title', 'Season monitored, click to unmonitor');
    } else {
      this.ui.seasonMonitored.prop('title', 'Season unmonitored, click to monitor');
    }
  },

  _showEpisodes() {
    this.showingEpisodes = true;
    this.ui.panel.addClass('expanded');

    if (!this.$el.hasClass('loaded')) {
      this.$el.addClass('loaded');

      this.episodes.show(new TableView({
        collection: this.episodeCollection,
        itemView: EpisodeRow,
        headers: this.headers,
        className: 'table table-hover'
      }));
    }
  },

  _hideEpisodes() {
    this.showingEpisodes = false;
    this.ui.panel.removeClass('expanded');
  },

  _shouldShowEpisodes() {
    if (this.episodeCollection.length > 50) {
      return false;
    }

    var startDate = moment().add('month', -1);
    var endDate = moment().add('year', 1);

    return this.episodeCollection.some(function(episode) {
      var airDate = episode.get('airDateUtc');

      if (airDate) {
        var airDateMoment = moment(airDate);

        if (airDateMoment.isAfter(startDate) && airDateMoment.isBefore(endDate)) {
          return true;
        }
      }

      return false;
    });
  },

  _showHideEpisodes(e) {
    if (this.showingEpisodes) {
      this._hideEpisodes();
    } else {
      this._showEpisodes();
    }

    this.ui.panel.toggleClass('expanded', this.showingEpisodes);
  },

  _episodeMonitoredToggled(options) {
    var model = options.model;
    var shiftKey = options.shiftKey;

    if (!this.episodeCollection.get(model.get('id'))) {
      return;
    }

    if (!shiftKey) {
      return;
    }

    var lastToggled = this.episodeCollection.lastToggled;

    if (!lastToggled) {
      return;
    }

    this.episodeCollection.lastToggled = model;
  },

  _updateEpisodeCollection() {
    this.episodeCollection.add(this.fullEpisodeCollection.bySeason(this.model.get('seasonNumber')).models, { merge: true });

    this.episodeCollection.each((model) => {
      model.episodeCollection = this.episodeCollection;
    });
  },

  _refreshEpisodes() {
    this._updateEpisodeCollection();
    this.episodeCollection.fullCollection.sort();
  },

  _openEpisodeFileEditor() {
    var view = new EpisodeFileEditorLayout({
      model: this.model,
      series: this.series,
      episodeCollection: this.episodeCollection
    });

    vent.trigger(vent.Commands.OpenFullscreenModal, view);
  },

  onMonitoredChange() {
    this._setSeasonMonitoredState();
  }
});
