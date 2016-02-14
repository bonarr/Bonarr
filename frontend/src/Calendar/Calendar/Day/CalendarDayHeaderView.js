var _ = require('underscore');
var moment = require('moment');
var Marionette = require('marionette');
var UiSettings = require('Shared/UiSettingsModel');
var FormatHelpers = require('Shared/FormatHelpers');

module.exports = Marionette.ItemView.extend({
  template: 'Calendar/Calendar/Day/CalendarDayHeaderView',
  className: 'calendar-day-headers ',

  initialize(options) {
    this.view = options.view;
    this.days = options.days;
  },

  serializeData() {
    return {
      days: _.map(_.take(this.days, 7), (day) => {
        return {
          title: this._getHeaderFormat(day),
          today: (this.view === 'week' || this.view === 'forecast') && day.isSame(moment(), 'day')
        };
      })
    };
  },

  _getHeaderFormat(day) {
    var view = this.view;

    if (view === 'week') {
      return day.format(UiSettings.get('calendarWeekColumnHeader'));
    } else if (this.view === 'forecast' && UiSettings.get('showRelativeDates')) {
      return FormatHelpers.relativeDate(day);
    } else if (view === 'month') {
      return day.format('ddd');
    } else {
      return day.format('dddd');
    }
  }
});
