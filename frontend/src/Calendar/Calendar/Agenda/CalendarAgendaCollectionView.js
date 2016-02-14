var Marionette = require('marionette');
var CalendarAgendaDayView = require('./CalendarAgendaDayView');

module.exports = Marionette.CollectionView.extend({
  itemView: CalendarAgendaDayView,
  className: 'calendar-agenda'
});
