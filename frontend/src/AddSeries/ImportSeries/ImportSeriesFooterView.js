var _ = require('underscore');
var Marionette = require('marionette');
var profileCollection = require('Profile/profileCollection');
var tpl = require('./ImportSeriesFooterView.hbs');

const ImportSeriesFooterView = Marionette.ItemView.extend({
  template: tpl,

  ui: {
    monitorSelect: '.x-monitor',
    profileSelect: '.x-profile',
    seasonFolderCheckbox: '.x-season-folder',
    selectedCount: '.x-selected-count',
    filedset: 'fieldset'
  },

  events: {
    'click .x-import': 'onImportSeries',
    'change .x-profile': 'onProfileChange',
    'change .x-monitor': 'onMonitorChange'
  },

  initialize(options) {
    this.collection = options.collection;
    this.listenTo(this.collection, 'selected change', this._updateInfo);
  },

  templateHelpers() {
    return {
      profiles: profileCollection.toJSON()
    };
  },

  _updateInfo(model) {
    const selectedModels = this.collection.getSelected();

    const selectedCount = selectedModels.length;
    this.ui.selectedCount.text(selectedCount);
    this.ui.filedset.prop('disabled', !selectedCount);

    const profileIds = _.unique(_.map(selectedModels, (_model) => {
      return _model.get('profileId');
    }));

    const monitorTypes = _.unique(_.map(selectedModels, (_model) => {
      return _model.get('monitor');
    }));

    if (profileIds.length === 1) {
      this.ui.profileSelect.val(profileIds[0]);
    }

    if (monitorTypes.length === 1) {
      this.ui.monitorSelect.val(monitorTypes[0]);
    }
  },

  onRender() {
    this._updateInfo();
  },

  onProfileChange() {
    const profileId = parseInt(this.ui.profileSelect.val());
    const selectedModels = this.collection.getSelected();

    _.each(selectedModels, (model) => {
      model.set('profileId', profileId);
    });
  },

  onMonitorChange() {
    const monitor = this.ui.monitorSelect.val();
    const selectedModels = this.collection.getSelected();

    _.each(selectedModels, (model) => {
      model.set('monitor', monitor);
    });
  },

  onImportSeries() {
    this.collection.importSelected({
      seasonFolder: !!this.ui.seasonFolderCheckbox.val()
    });
  }
});

module.exports = ImportSeriesFooterView;
