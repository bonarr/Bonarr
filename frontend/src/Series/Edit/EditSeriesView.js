const vent = require('vent');
const Marionette = require('marionette');
const profileCollection = require('Profile/profileCollection');
const AsModelBoundView = require('Mixins/AsModelBoundView');
const AsValidatedView = require('Mixins/AsValidatedView');
const AsEditModalView = require('Mixins/AsEditModalView');
const tpl = require('./EditSeriesView.hbs');
require('Mixins/TagInput');
require('Mixins/FileBrowser');

const EditSeriesView = Marionette.ItemView.extend({
  template: tpl,

  ui: {
    profile: '.x-profile',
    path: '.x-path',
    tags: '.x-tags'
  },

  events: {
    'click .x-remove': '_removeSeries'
  },

  templateHelpers() {
    return {
      profiles: profileCollection.toJSON()
    };
  },

  onRender() {
    this.ui.path.fileBrowser();
    this.ui.tags.tagInput({
      model: this.model,
      property: 'tags'
    });
  },

  _onBeforeSave() {
    const profileId = this.ui.profile.val();
    this.model.set({
      profileId
    });
  },

  _onAfterSave() {
    this.trigger('saved');
    this.destroy();
  },

  _removeSeries() {
    vent.trigger(vent.Commands.DeleteSeries, {
      series: this.model
    });
  }
});

AsModelBoundView.call(EditSeriesView);
AsValidatedView.call(EditSeriesView);
AsEditModalView.call(EditSeriesView);

module.exports = EditSeriesView;
