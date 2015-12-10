var _ = require('underscore');
var moment = require('moment');
var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: 'Calendar/Calendar/Day/CalendarDayHeaderView',
  className: 'calendar-day-headers ',

  initialize: function (options) {
    this.view = options.view;
    this.headerFormat = options.headerFormat;
    this.days = options.days;
  },

  serializeData: function () {
    // TODO: Show the date, format depends on view
    return {
      days: _.map(_.take(this.days, 7), (day) => {
        return {
          title: day.format(this.headerFormat),
          today: this.view === 'week' && day.isSame(moment(), 'day')
        };
      })
    };
  }
});
