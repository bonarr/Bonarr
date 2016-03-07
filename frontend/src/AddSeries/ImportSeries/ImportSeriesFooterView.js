var _ = require('underscore');
var Marionette = require('marionette');
var profileCollection = require('Profile/profileCollection');
var tpl = require('./ImportSeriesFooterView.hbs');

const ImportSeriesFooterView = Marionette.ItemView.extend({
  template: tpl,

  ui: {
    monitored: '.x-monitored',
    profile: '.x-profile',
    seasonFolder: '.x-season-folder',
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
    // const selected = this.collection.getSelected();
    // const monitored = this.ui.monitored.val();
    // const profile = this.ui.profile.val();
    // const seasonFolder = this.ui.seasonFolder.val();

    // _.each(selected, (model) => {
    //   if (monitored === 'true') {
    //     model.set('monitored', true);
    //   } else if (monitored === 'false') {
    //     model.set('monitored', false);
    //   }
    //
    //   if (profile !== 'noChange') {
    //     model.set('profileId', parseInt(profile, 10));
    //   }
    //
    //   if (seasonFolder === 'true') {
    //     model.set('seasonFolder', true);
    //   } else if (seasonFolder === 'false') {
    //     model.set('seasonFolder', false);
    //   }
    //
    //   model.edited = true;
    // });

    this.collection.importSelected();
  }
});

module.exports = ImportSeriesFooterView;
