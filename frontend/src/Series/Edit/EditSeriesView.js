var vent = require('vent');
var Marionette = require('marionette');
var Profiles = require('Profile/ProfileCollection');
var AsModelBoundView = require('Mixins/AsModelBoundView');
var AsValidatedView = require('Mixins/AsValidatedView');
var AsEditModalView = require('Mixins/AsEditModalView');
require('Mixins/TagInput');
require('Mixins/FileBrowser');

var view = Marionette.ItemView.extend({
  template: 'Series/Edit/EditSeriesView',

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
      profiles: Profiles.toJSON()
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
    var profileId = this.ui.profile.val();
    this.model.set({
      profileId: profileId
    });
  },

  _onAfterSave() {
    this.trigger('saved');
    vent.trigger(vent.Commands.CloseFullscreenModal);
  },

  _removeSeries() {
    vent.trigger(vent.Commands.DeleteSeries, {
      series: this.model
    });
  }
});

AsModelBoundView.call(view);
AsValidatedView.call(view);
AsEditModalView.call(view);

module.exports = view;