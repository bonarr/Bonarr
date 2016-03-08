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
    'click .x-import': 'onImportSeries'
  },

  templateHelpers() {
    return {
      profiles: profileCollection.toJSON()
    };
  },

  initialize(options) {
    this.collection = options.collection;
    this.listenTo(this.collection, 'selected', this._updateInfo);
  },

  _updateInfo() {
    const selectedCount = this.collection.getSelected().length;
    this.ui.selectedCount.text(selectedCount);
    this.ui.filedset.prop('disabled', !selectedCount);
  },

  onRender() {
    this._updateInfo();
  },

  onImportSeries() {
    this.collection.importSelected({
      seasonFolder: !!this.ui.seasonFolderCheckbox.val()
    });
  }
});

module.exports = ImportSeriesFooterView;
