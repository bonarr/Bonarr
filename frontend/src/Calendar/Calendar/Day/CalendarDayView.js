var Marionette = require('marionette');
var CalendarEventCollectionView = require('../Events/CalendarEventCollectionView');

module.exports = Marionette.Layout.extend({
  template: 'Calendar/Calendar/Day/CalendarDayView',
  className: 'calendar-day',

  regions : {
    events: '.x-calendar-day-events'
  },

  serializeData: function () {
    // TODO: Show the date, format depends on view
    return {
      date: this.model.get('date'),
      view: this.model.get('view')
    };
  },

  onShow : function () {
    this.events.show(new CalendarEventCollectionView({ collection: this.model.get('events') }));
  }
});
