var Marionette = require('marionette');
var CalendarEventView = require('./CalendarEventView');

module.exports = Marionette.CollectionView.extend({
  itemView: CalendarEventView,
  className: 'calendar-events',

  initialize(options) {
    this.itemViewOptions = options;
  }
});
