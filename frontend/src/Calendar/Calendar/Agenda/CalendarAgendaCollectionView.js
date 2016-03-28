var Marionette = require('marionette');
var CalendarAgendaDayView = require('./CalendarAgendaDayView');

module.exports = Marionette.CollectionView.extend({
  childView: CalendarAgendaDayView,
  className: 'calendar-agenda'
});
