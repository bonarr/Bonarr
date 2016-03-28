var Marionette = require('marionette');
var CalendarDayView = require('./CalendarDayView');

module.exports = Marionette.CollectionView.extend({
  childView: CalendarDayView,
  className: 'calendar-days'
});
