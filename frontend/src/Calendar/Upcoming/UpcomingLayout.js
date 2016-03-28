var Marionette = require('marionette');
var UpcomingCollectionView = require('./UpcomingCollectionView');

module.exports = Marionette.LayoutView.extend({
  template: 'Calendar/Upcoming/UpcomingLayout',

  regions: {
    today: '.x-today',
    datePicker: '.x-date-picker'
  },

  onShow() {
    this._showToday();
  },

  setShowUnmonitored(showUnmonitored) {
    this.upcomingView.setShowUnmonitored(showUnmonitored);
  },

  _showToday() {
    this.upcomingView = new UpcomingCollectionView();
    this.today.show(this.upcomingView);
  }
});
