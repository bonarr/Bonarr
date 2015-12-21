var _ = require('underscore');
var Marionette = require('marionette');
var SettingsLayoutBase = require('../SettingsLayoutBase');
var ProfileCollection = require('Profile/ProfileCollection');
var ProfileCollectionView = require('./ProfileCollectionView');
var DelayProfileLayout = require('./Delay/DelayProfileLayout');
var DelayProfileCollection = require('./Delay/DelayProfileCollection');
require('./Language/LanguageCollection');

module.exports = SettingsLayoutBase.extend({
  template: 'Settings/Profile/ProfileLayoutTemplate',

  regions: {
    profile: '#profile',
    delayProfile: '#delay-profile'
  },

  initialize: function() {
    this.delayProfileCollection = new DelayProfileCollection();
    SettingsLayoutBase.prototype.initialize.apply(this, arguments);
  },

  onRender: function() {
    var promise = Marionette.$.when(ProfileCollection.fetch(),
      this.delayProfileCollection.fetch());

    promise.done(_.bind(function() {
      if (this.isClosed) {
        return;
      }

      this.profile.show(new ProfileCollectionView({ collection: ProfileCollection }));
      this.delayProfile.show(new DelayProfileLayout({ collection: this.delayProfileCollection }));
    }, this));
  }
});
