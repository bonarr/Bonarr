var _ = require('underscore');
var $ = require('jquery');
var Marionette = require('marionette');
var SettingsLayoutBase = require('../SettingsLayoutBase');
var profileCollection = require('Profile/profileCollection');
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

  initialize() {
    this.delayProfileCollection = new DelayProfileCollection();
    SettingsLayoutBase.prototype.initialize.apply(this, arguments);
  },

  onRender() {
    var promise = $.when(profileCollection.fetch(),
      this.delayProfileCollection.fetch());

    promise.done(_.bind(function() {
      if (this.isDestroyed) {
        return;
      }

      this.profile.show(new ProfileCollectionView({ collection: profileCollection }));
      this.delayProfile.show(new DelayProfileLayout({ collection: this.delayProfileCollection }));
    }, this));
  }
});
