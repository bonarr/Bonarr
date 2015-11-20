var Marionette = require('marionette');
var CalendarDayView = require('./CalendarDayView');

module.exports = Marionette.CollectionView.extend({
  itemView: CalendarDayView,
  className: 'calendar-days'
});
