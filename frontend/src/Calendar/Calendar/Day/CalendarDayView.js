var Marionette = require('marionette');
var CalendarEventCollectionView = require('../Events/CalendarEventCollectionView');

module.exports = Marionette.Layout.extend({
  template: 'Calendar/Calendar/Day/CalendarDayView',
  className: 'calendar-day',

  regions: {
    events: '.x-calendar-day-events'
  },

  serializeData() {
    return {
      date: this.model.get('date'),
      view: this.model.get('view')
    };
  },

  onShow() {
    this.events.show(new CalendarEventCollectionView({
      collection: this.model.get('events'),
      style: 'standard'
    }));
  }
});
