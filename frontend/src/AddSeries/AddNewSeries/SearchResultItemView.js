var _ = require('underscore');
var vent = require('vent');
var Backbone = require('backbone');
var Marionette = require('marionette');
var profileCollection = require('Profile/profileCollection');
var RootFolders = require('../RootFolders/RootFolderCollection');
var RootFolderLayout = require('../RootFolders/RootFolderLayout');
var SeriesCollection = require('Series/SeriesCollection');
var Config = require('Config');
var Messenger = require('Shared/Messenger');
var AsValidatedView = require('Mixins/AsValidatedView');
var AddSeriesModal = require('../AddSeriesModal');
var tpl = require('./SearchResultItemView.hbs');
var $ = require('jquery');

require('jquery.dotdotdot');
require('jquery.lazyload');

const SearchResultItemView = Marionette.ItemView.extend({
  template: tpl,

  ui: {
    profile: '.x-profile',
    rootFolder: '.x-root-folder',
    seasonFolder: '.x-season-folder',
    seriesType: '.x-series-type',
    monitor: '.x-monitor',
    monitorTooltip: '.x-monitor-tooltip',
    addButton: '.x-add',
    addSearchButton: '.x-add-search',
    overview: '.x-overview',
    lazyImage: 'img.lazy'
  },

  events: {
    'click': 'onClick',
    'click .x-add': '_addWithoutSearch',
    'click .x-add-search': '_addAndSearch',
    'change .x-profile': '_profileChanged',
    'change .x-root-folder': '_rootFolderChanged',
    'change .x-season-folder': '_seasonFolderChanged',
    'change .x-series-type': '_seriesTypeChanged',
    'change .x-monitor': '_monitorChanged'
  },

  initialize() {
    this.listenTo(vent, Config.Events.ConfigUpdatedEvent, this._onConfigUpdated);
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(RootFolders, 'all', this.render);
  },

  templateHelpers() {
    var helpers = {};

    var existingSeries = SeriesCollection.findWhere({ tvdbId: this.model.get('tvdbId') });

    if (existingSeries) {
      helpers.existing = existingSeries.toJSON();
    }

    helpers.profiles = profileCollection.toJSON();
    helpers.rootFolders = RootFolders.toJSON();

    return helpers;
  },

  onRender() {
    var defaultProfile = Config.getValue(Config.Keys.DefaultProfileId);
    var defaultRoot = Config.getValue(Config.Keys.DefaultRootFolderId);
    var useSeasonFolder = Config.getValueBoolean(Config.Keys.UseSeasonFolder, true);
    var defaultSeriesType = Config.getValue(Config.Keys.DefaultSeriesType, 'standard');
    var defaultMonitorEpisodes = Config.getValue(Config.Keys.MonitorEpisodes, 'missing');

    if (profileCollection.get(defaultProfile)) {
      this.ui.profile.val(defaultProfile);
    }

    if (RootFolders.get(defaultRoot)) {
      this.ui.rootFolder.val(defaultRoot);
    }

    this.ui.seasonFolder.prop('checked', useSeasonFolder);
    this.ui.seriesType.val(defaultSeriesType);
    this.ui.monitor.val(defaultMonitorEpisodes);

    this.templateFunction = Marionette.TemplateCache.get('AddSeries/MonitoringTooltipTemplate');
    var content = this.templateFunction();

    this.ui.monitorTooltip.popover({
      content: content,
      html: true,
      trigger: 'hover',
      title: 'Episode Monitoring Options',
      placement: 'right',
      container: this.$el
    });
  },

  onShow() {
    this.ui.overview.dotdotdot({
      height: 100,
      wrap: 'letter'
    });

    this.ui.lazyImage.lazyload({
      threshold: 200,
      container: $('.content-wrapper')
    });
  },

  _onConfigUpdated(options) {
    if (options.key === Config.Keys.DefaultProfileId) {
      this.ui.profile.val(options.value);
    } else if (options.key === Config.Keys.DefaultRootFolderId) {
      this.ui.rootFolder.val(options.value);
    } else if (options.key === Config.Keys.UseSeasonFolder) {
      this.ui.seasonFolder.prop('checked', options.value);
    } else if (options.key === Config.Keys.DefaultSeriesType) {
      this.ui.seriesType.val(options.value);
    } else if (options.key === Config.Keys.MonitorEpisodes) {
      this.ui.monitor.val(options.value);
    }
  },

  _profileChanged() {
    Config.setValue(Config.Keys.DefaultProfileId, this.ui.profile.val());
  },

  _seasonFolderChanged() {
    Config.setValue(Config.Keys.UseSeasonFolder, this.ui.seasonFolder.prop('checked'));
  },

  _rootFolderChanged() {
    var rootFolderValue = this.ui.rootFolder.val();
    if (rootFolderValue === 'addNew') {
      var rootFolderLayout = new RootFolderLayout();
      this.listenToOnce(rootFolderLayout, 'folderSelected', this._setRootFolder);
      vent.trigger(vent.Commands.OpenFullscreenModal, rootFolderLayout);
    } else {
      Config.setValue(Config.Keys.DefaultRootFolderId, rootFolderValue);
    }
  },

  _seriesTypeChanged() {
    Config.setValue(Config.Keys.DefaultSeriesType, this.ui.seriesType.val());
  },

  _monitorChanged() {
    Config.setValue(Config.Keys.MonitorEpisodes, this.ui.monitor.val());
  },

  _setRootFolder(options) {
    vent.trigger(vent.Commands.CloseFullscreenModal);
    this.ui.rootFolder.val(options.model.id);
    this._rootFolderChanged();
  },

  _addWithoutSearch() {
    this._addSeries(false);
  },

  _addAndSearch() {
    this._addSeries(true);
  },

  _addSeries(searchForMissingEpisodes) {
    var addButton = this.ui.addButton;
    var addSearchButton = this.ui.addSearchButton;

    addButton.addClass('disabled');
    addSearchButton.addClass('disabled');

    var profile = this.ui.profile.val();
    var rootFolderPath = this.ui.rootFolder.children(':selected').text();
    var seriesType = this.ui.seriesType.val();
    var seasonFolder = this.ui.seasonFolder.prop('checked');

    var options = this._getAddSeriesOptions();
    options.searchForMissingEpisodes = searchForMissingEpisodes;

    this.model.set({
      profileId: profile,
      rootFolderPath: rootFolderPath,
      seasonFolder: seasonFolder,
      seriesType: seriesType,
      addOptions: options
    }, { silent: true });

    var self = this;
    var promise = this.model.save();

    if (searchForMissingEpisodes) {
      this.ui.addSearchButton.spinForPromise(promise);
    } else {
      this.ui.addButton.spinForPromise(promise);
    }

    promise.always(function() {
      addButton.removeClass('disabled');
      addSearchButton.removeClass('disabled');
    });

    promise.done(function() {
      SeriesCollection.add(self.model);

      self.close();

      Messenger.show({
        message: 'Added: ' + self.model.get('title'),
        actions: {
          goToSeries: {
            label: 'Go to Series',
            action() {
              Backbone.history.navigate('/series/' + self.model.get('titleSlug'), { trigger: true });
            }
          }
        },
        hideAfter: 8,
        hideOnNavigate: true
      });

      vent.trigger(vent.Events.SeriesAdded, { series: self.model });
    });
  },

  _getAddSeriesOptions() {
    var monitor = this.ui.monitor.val();
    var lastSeason = _.max(this.model.get('seasons'), 'seasonNumber');
    var firstSeason = _.min(_.reject(this.model.get('seasons'), { seasonNumber: 0 }), 'seasonNumber');

    this.model.setSeasonPass(firstSeason.seasonNumber);

    var options = {
      ignoreEpisodesWithFiles: false,
      ignoreEpisodesWithoutFiles: false
    };

    if (monitor === 'all') {
      return options;
    } else if (monitor === 'future') {
      options.ignoreEpisodesWithFiles = true;
      options.ignoreEpisodesWithoutFiles = true;
    } else if (monitor === 'latest') {
      this.model.setSeasonPass(lastSeason.seasonNumber);
    } else if (monitor === 'first') {
      this.model.setSeasonPass(lastSeason.seasonNumber + 1);
      this.model.setSeasonMonitored(firstSeason.seasonNumber);
    } else if (monitor === 'missing') {
      options.ignoreEpisodesWithFiles = true;
    } else if (monitor === 'existing') {
      options.ignoreEpisodesWithoutFiles = true;
    } else if (monitor === 'none') {
      this.model.setSeasonPass(lastSeason.seasonNumber + 1);
    }

    return options;
  },

  onClick() {
    var existingSeries = SeriesCollection.findWhere({ tvdbId: this.model.get('tvdbId') });

    if (!existingSeries) {
      vent.trigger(vent.Commands.OpenFullscreenModal, new AddSeriesModal({ model: this.model }));
    }
  }
});

AsValidatedView.apply(SearchResultItemView);

module.exports = SearchResultItemView;
