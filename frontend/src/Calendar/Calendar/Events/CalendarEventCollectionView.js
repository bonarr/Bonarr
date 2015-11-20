var Marionette = require('marionette');
var CalendarEventView = require('./CalendarEventView');

module.exports = Marionette.CollectionView.extend({
  itemView: CalendarEventView,
  className: 'calendar-events'
});
