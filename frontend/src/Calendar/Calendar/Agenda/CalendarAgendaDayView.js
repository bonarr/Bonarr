var Marionette = require('marionette');
var CalendarEventCollectionView = require('../Events/CalendarEventCollectionView');

module.exports = Marionette.Layout.extend({
  template: 'Calendar/Calendar/Agenda/CalendarAgendaDayView',
  className: 'calendar-day',

  regions : {
    events: '.x-calendar-day-events'
  },

  serializeData() {
    // TODO: Show the date, format depends on view
    return {
      date: this.model.get('date')
    };
  },

  onShow () {
    this.events.show(new CalendarEventCollectionView({
      collection: this.model.get('events'),
      style: 'agenda'
  }));
  }
});
