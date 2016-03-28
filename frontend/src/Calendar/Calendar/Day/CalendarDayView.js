var Marionette = require('marionette');
var CalendarEventCollectionView = require('../Events/CalendarEventCollectionView');
var tpl = require('./CalendarDayView.hbs');

module.exports = Marionette.LayoutView.extend({
  template: tpl,
  className: 'calendar-day',

  regions: {
    dayEvents: '.x-calendar-day-events-region'
  },

  serializeData() {
    return {
      date: this.model.get('date'),
      view: this.model.get('view')
    };
  },

  onShow() {
    this.dayEvents.show(new CalendarEventCollectionView({
      collection: this.model.get('events'),
      style: 'standard'
    }));
  }
});
