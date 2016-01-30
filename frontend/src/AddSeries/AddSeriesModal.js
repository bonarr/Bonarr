var _ = require('underscore');
var vent = require('vent');
var Backbone = require('backbone');
var Marionette = require('marionette');
var Profiles = require('Profile/ProfileCollection');
var RootFolders = require('./RootFolders/RootFolderCollection');
var RootFolderLayout = require('./RootFolders/RootFolderLayout');
var SeriesCollection = require('Series/SeriesCollection');
var Config = require('Config');
var Messenger = require('Shared/Messenger');
var AsValidatedView = require('Mixins/AsValidatedView');
var tpl = require('./AddSeriesModal.hbs');

var Keys = {
  DefaultProfileId: 'AddSeries.DefaultProfileId',
  DefaultRootFolderId: 'AddSeries.DefaultRootFolderId',
  UseSeasonFolder: 'AddSeries.UseSeasonFolder',
  DefaultSeriesType: 'AddSeries.DefaultSeriesType',
  MonitorEpisodes: 'AddSeries.MonitorEpisodes',
  StartSearch: 'AddSeries.StartSearch'
};

var view = Marionette.ItemView.extend({
  template: tpl,

  ui: {
    profile: '.x-profile',
    rootFolder: '.x-root-folder',
    seasonFolder: '.x-season-folder',
    seriesType: '.x-series-type',
    monitor: '.x-monitor',
    startSearch: '.x-start-search',

    monitorTooltip: '.x-monitor-tooltip',

    addButton: '.x-add'
  },

  events: {
    'click .x-add': 'onAdd',
    'change .x-profile': 'onProfileChanged',
    'change .x-root-folder': 'onRootFolderChanged',
    'change .x-series-type': 'onSeriesTypeChanged',
    'change .x-monitor': 'onMonitorChanged',
    'change .x-season-folder': 'onSeasonFolderChanged',
    'change .x-start-search': 'onStartSearchChanged'
  },

  initialize() {
    if (!this.model) {
      throw 'model is required';
    }

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(RootFolders, 'all', this.render);
    this.listenTo(Profiles, 'all', this.render);
  },

  templateHelpers() {
    return {
      profiles: Profiles.toJSON(),
      rootFolders: RootFolders.toJSON()
    };
  },

  onRender() {
    var profileId = Config.getValue(Keys.DefaultProfileId);
    var rootFolderId = Config.getValue(Keys.DefaultRootFolderId);
    var seriesType = Config.getValue(Keys.DefaultSeriesType, 'standard');
    var monitorType = Config.getValue(Keys.MonitorEpisodes, 'missing');

    var useSeasonFolder = Config.getValueBoolean(Keys.UseSeasonFolder, true);
    var startSearch = Config.getValueBoolean(Keys.StartSearch, false);

    if (Profiles.get(profileId)) {
      this.ui.profile.val(profileId);
    }

    if (RootFolders.get(rootFolderId)) {
      this.ui.rootFolder.val(rootFolderId);
    }

    this.ui.seriesType.val(seriesType);
    this.ui.monitor.val(monitorType);

    this.ui.seasonFolder.prop('checked', useSeasonFolder);
    this.ui.startSearch.prop('checked', startSearch);

    this.ui.monitorTooltip.popover({
      content: Marionette.TemplateCache.get('AddSeries/MonitoringTooltipTemplate')(),
      html: true,
      trigger: 'hover',
      title: 'Episode Monitoring Options',
      placement: 'right',
      container: this.$el
    });
  },

  onSeasonFolderChanged() {
    Config.setValue(Keys.UseSeasonFolder, this.ui.seasonFolder.prop('checked'));
  },

  onStartSearchChanged() {
    Config.setValue(Keys.StartSearch, this.ui.startSearch.prop('checked'));
  },

  onRootFolderChanged() {
    var rootFolderValue = this.ui.rootFolder.val();
    if (rootFolderValue === 'addNew') {
      var rootFolderLayout = new RootFolderLayout();
      this.listenToOnce(rootFolderLayout, 'folderSelected', this.onRootFolderAdded);
      vent.trigger(vent.Commands.OpenFullscreenModal, rootFolderLayout);
    } else {
      Config.setValue(Keys.DefaultRootFolderId, rootFolderValue);
    }
  },

  onProfileChanged() {
    Config.setValue(Keys.DefaultProfileId, this.ui.profile.val());
  },

  onSeriesTypeChanged() {
    Config.setValue(Keys.DefaultSeriesType, this.ui.seriesType.val());
  },

  onMonitorChanged() {
    Config.setValue(Keys.MonitorEpisodes, this.ui.monitor.val());
  },

  onRootFolderAdded(options) {
    vent.trigger(vent.Commands.CloseFullscreenModal);
    this.ui.rootFolder.val(options.model.id);
    Config.setValue(Keys.DefaultRootFolderId, options.model.id);
  },

  onAdd(event) {
    event.preventDefault();

    var addButton = this.ui.addButton;
    addButton.addClass('disabled');

    var profile = this.ui.profile.val();
    var rootFolderPath = this.ui.rootFolder.children(':selected').text();
    var seriesType = this.ui.seriesType.val();
    var seasonFolder = this.ui.seasonFolder.prop('checked');

    var options = this._getAddSeriesOptions();

    this.model.set({
      profileId: profile,
      rootFolderPath: rootFolderPath,
      seasonFolder: seasonFolder,
      seriesType: seriesType,
      addOptions: options
    }, { silent: true });

    var promise = this.model.save();

    this.ui.addButton.spinForPromise(promise);

    promise.always(function() {
      addButton.removeClass('disabled');
    });

    promise.done(_.bind(this.onSeriesAdded, this));
  },

  onSeriesAdded() {
    SeriesCollection.add(this.model);
    this.close();

    Messenger.show({
      message: 'Added: ' + this.model.get('title'),
      actions: {
        goToSeries: {
          label: 'Go to Series',
          action: () => {
            Backbone.history.navigate(this.model.getRoute(), { trigger: true });
          }
        }
      },
      hideAfter: 8,
      hideOnNavigate: true
    });

    vent.trigger(vent.Events.SeriesAdded, { series: self.model });
  },

  _getAddSeriesOptions() {
    var monitor = this.ui.monitor.val();
    var startSearch = this.ui.startSearch.prop('checked');
    var lastSeason = _.max(this.model.get('seasons'), 'seasonNumber');
    var firstSeason = _.min(_.reject(this.model.get('seasons'), { seasonNumber: 0 }), 'seasonNumber');

    this.model.setSeasonPass(firstSeason.seasonNumber);

    var options = {
      ignoreEpisodesWithFiles: false,
      ignoreEpisodesWithoutFiles: false,
      startSearch: startSearch
    };

    switch (monitor) {
      case 'all': {
        break;
      }
      case 'future': {
        options.ignoreEpisodesWithFiles = true;
        options.ignoreEpisodesWithoutFiles = true;
        break;
      }
      case 'latest': {
        this.model.setSeasonPass(lastSeason.seasonNumber);
        break;
      }
      case 'first': {
        this.model.setSeasonPass(lastSeason.seasonNumber + 1);
        this.model.setSeasonMonitored(firstSeason.seasonNumber);
        break;
      }
      case 'missing': {
        options.ignoreEpisodesWithFiles = true;
        break;
      }
      case 'existing': {
        options.ignoreEpisodesWithoutFiles = true;
        break;
      }
      case 'none': {
        this.model.setSeasonPass(lastSeason.seasonNumber + 1);
        break;
      }
    }

    return options;
  }
});

AsValidatedView.apply(view);
module.exports = view;
