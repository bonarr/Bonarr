var Marionette = require('marionette');
var CalendarEventView = require('./CalendarEventView');

module.exports = Marionette.CollectionView.extend({
  childView: CalendarEventView,
  className: 'calendar-events',

  initialize(options) {
    this.childViewOptions = options;
  }
});
