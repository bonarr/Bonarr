var _ = require('underscore');
var moment = require('moment');
var Marionette = require('marionette');
var UpcomingCollection = require('./UpcomingCollection');
var UpcomingItemView = require('./UpcomingItemView');
var Config = require('../../Config');

require('../../Mixins/backbone.signalr.mixin');

module.exports = Marionette.CollectionView.extend({
  itemView: UpcomingItemView,

  initialize: function() {
    this.showUnmonitored = Config.getValue('calendar.show', 'monitored') === 'all';
    this.collection = new UpcomingCollection().bindSignalR({ updateOnly: true });
    this._fetchCollection();

    this._fetchCollection = _.bind(this._fetchCollection, this);
    this.timer = window.setInterval(this._fetchCollection, 60 * 60 * 1000);
  },

  onClose: function() {
    window.clearInterval(this.timer);
  },

  setShowUnmonitored: function(showUnmonitored) {
    if (this.showUnmonitored !== showUnmonitored) {
      this.showUnmonitored = showUnmonitored;
      this._fetchCollection();
    }
  },

  _fetchCollection: function() {
    var time = moment();
    var start = time.clone().startOf('day').toISOString();
    var end = time.clone().endOf('day').toISOString();

    this.collection.fetch({
      data: {
        start,
        end,
        unmonitored: this.showUnmonitored
      }
    });
  }
});