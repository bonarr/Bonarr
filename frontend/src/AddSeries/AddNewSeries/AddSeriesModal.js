const _ = require('underscore');
const vent = require('vent');
const Backbone = require('backbone');
const Marionette = require('marionette');
const profileCollection = require('Profile/profileCollection');
const RootFolders = require('../RootFolders/RootFolderCollection');
const RootFolderLayout = require('../RootFolders/RootFolderLayout');
const SeriesCollection = require('Series/SeriesCollection');
const Config = require('Config');
const Messenger = require('Shared/Messenger');
const AsValidatedView = require('Mixins/AsValidatedView');
const tpl = require('./AddSeriesModal.hbs');
const monitorTooltipTpl = require('../MonitorTooltip.hbs');

const Keys = {
  DefaultProfileId: 'AddSeries.DefaultProfileId',
  DefaultRootFolderId: 'AddSeries.DefaultRootFolderId',
  UseSeasonFolder: 'AddSeries.UseSeasonFolder',
  DefaultSeriesType: 'AddSeries.DefaultSeriesType',
  MonitorEpisodes: 'AddSeries.MonitorEpisodes',
  StartSearch: 'AddSeries.StartSearch'
};

const AddSeriesModal = Marionette.ItemView.extend({
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
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(RootFolders, 'all', this.render);
    this.listenTo(profileCollection, 'all', this.render);
  },

  templateHelpers() {
    return {
      profiles: profileCollection.toJSON(),
      rootFolders: RootFolders.toJSON()
    };
  },

  onRender() {
    const profileId = Config.getValue(Keys.DefaultProfileId);
    const rootFolderId = Config.getValue(Keys.DefaultRootFolderId);
    const seriesType = Config.getValue(Keys.DefaultSeriesType, 'standard');
    const monitorType = Config.getValue(Keys.MonitorEpisodes, 'missing');

    const useSeasonFolder = Config.getValueBoolean(Keys.UseSeasonFolder, true);
    const startSearch = Config.getValueBoolean(Keys.StartSearch, false);

    if (profileCollection.get(profileId)) {
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
      content: monitorTooltipTpl(),
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
    const rootFolderValue = this.ui.rootFolder.val();
    if (rootFolderValue === 'addNew') {
      const rootFolderLayout = new RootFolderLayout();
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

    const addButton = this.ui.addButton;
    addButton.addClass('disabled');

    const profileId = this.ui.profile.val();
    const rootFolderPath = this.ui.rootFolder.children(':selected').text();
    const seriesType = this.ui.seriesType.val();
    const seasonFolder = this.ui.seasonFolder.prop('checked');
    const monitor = this.ui.monitor.val();
    const startSearch = this.ui.startSearch.prop('checked');

    this.model.set({
      profileId,
      rootFolderPath,
      seasonFolder,
      seriesType
    }, {
      silent: true
    });

    this.model.setAddOptions({
      monitor,
      startSearch
    });

    const promise = this.model.save();

    this.ui.addButton.spinForPromise(promise);

    promise.always(() => {
      addButton.removeClass('disabled');
    });

    promise.done(_.bind(this.onSeriesAdded, this));
  },

  onSeriesAdded() {
    SeriesCollection.add(this.model);
    this.destroy();

    Messenger.show({
      message: `Added: ${this.model.get('title')}`,
      actions: {
        goToSeries: {
          label: 'Go to Series',
          action: () => {
            Backbone.history.navigate(this.model.getRoute(), {
              trigger: true
            });
          }
        }
      },
      hideAfter: 8,
      hideOnNavigate: true
    });
  }
});

AsValidatedView.apply(AddSeriesModal);
module.exports = AddSeriesModal;
