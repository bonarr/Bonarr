var Marionette = require('marionette');
var CalendarEventCollectionView = require('../Events/CalendarEventCollectionView');
var tpl = require('./CalendarAgendaDayView.hbs');

module.exports = Marionette.Layout.extend({
  template: tpl,
  className: 'calendar-day',

  regions: {
    events: '.x-calendar-day-events'
  },

  serializeData() {
    // TODO: Show the date, format depends on view
    return {
      date: this.model.get('date')
    };
  },

  onShow() {
    this.events.show(new CalendarEventCollectionView({
      collection: this.model.get('events'),
      style: 'agenda'
    }));
  }
});
