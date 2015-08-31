var _ = require('underscore');
var SettingsLayoutBase = require('../SettingsLayoutBase');
var NotificationCollectionView = require('./NotificationCollectionView');
var NotificationCollection = require('./NotificationCollection');

module.exports = SettingsLayoutBase.extend({
  template: 'Settings/Notification/NotificationLayoutTemplate',

  regions: {
    notification: '#notification'
  },

  initialize: function() {
    this.collection = new NotificationCollection();
    SettingsLayoutBase.prototype.initialize.apply(this, arguments);
  },

  onRender: function() {
    var promise = this.collection.fetch();

    promise.done(_.bind(function() {
      if (this.isClosed) {
        return;
      }

      this.notification.show(new NotificationCollectionView({collection: this.collection}));
    }, this));
  }
});
