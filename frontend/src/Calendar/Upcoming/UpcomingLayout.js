var Marionette = require('marionette');
var UpcomingCollectionView = require('./UpcomingCollectionView');

module.exports = Marionette.Layout.extend({
  template: 'Calendar/Upcoming/UpcomingLayout',

  regions: {
    today: '.x-today',
    datePicker: '.x-date-picker'
  },

  onShow: function() {
    this._showToday();
  },

  setShowUnmonitored: function(showUnmonitored) {
    this.upcomingView.setShowUnmonitored(showUnmonitored);
  },

  _showToday: function() {
    this.upcomingView = new UpcomingCollectionView();
    this.today.show(this.upcomingView);
  }
});