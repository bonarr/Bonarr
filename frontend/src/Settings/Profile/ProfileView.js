var vent = require('vent');
var Marionette = require('marionette');
var EditProfileView = require('./Edit/EditProfileLayout');
var AsModelBoundView = require('Mixins/AsModelBoundView');
require('./AllowedLabeler');
require('./LanguageLabel');
require('bootstrap');

var view = Marionette.ItemView.extend({
  template: 'Settings/Profile/ProfileView',
  className: 'profile-item thingy',

  ui: {
    "progressbar": '.progress .bar',
    "deleteButton": '.x-delete'
  },

  events: {
    'click': '_editProfile'
  },

  initialize() {
    this.listenTo(this.model, 'sync', this.render);
  },

  _editProfile() {
    var view = new EditProfileView({
      model: this.model,
      profileCollection: this.model.collection
    });
    vent.trigger(vent.Commands.OpenFullscreenModal, view);
  }
});

module.exports = AsModelBoundView.call(view);