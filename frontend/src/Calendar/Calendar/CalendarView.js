var $ = require('jquery');
var vent = require('vent');
var Marionette = require('marionette');
var moment = require('moment');
var momentRange = require('momentRange');
var CalendarCollection = require('../CalendarCollection');
var UiSettings = require('../../Shared/UiSettingsModel');
var Config = require('../../Config');
var CalendarDayCollectionView = require('./Day/CalendarDayCollectionView');
var CalendarDayEventCollection = require('./Day/CalendarDayEventCollection');
var CalendarDayCollection = require('./Day/CalendarDayCollection');
var CalendarDayModel = require('./Day/CalendarDayModel');
var CalendarDayHeaderView = require('./Day/CalendarDayHeaderView');

require('../../Mixins/backbone.signalr.mixin');
require('jquery.easypiechart');

module.exports = Marionette.Layout.extend({
  template: 'Calendar/Calendar/CalendarView',
  storageKey: 'calendar.view',

  regions : {
    headersRegion : '.x-calendar-day-headers',
    daysRegion: '.x-calendar-days'
  },

  events: {
    'click .x-view' : '_changeView'
  },

  initialize: function() {
    this.showUnmonitored = Config.getValue('calendar.show', 'monitored') === 'all';
    this.collection = new CalendarCollection().bindSignalR({ updateOnly: true });
    this.dayCollection = new CalendarDayCollection();

    // TODO: This should update existing events instead of redrawing the entire calendar
    this.listenTo(this.collection, 'sync', this._reloadCalendarEvents);

    this.time = moment();
  },

  onShow: function () {
    this.firstDayOfWeek = UiSettings.get('firstDayOfWeek');
    this.isMobile = $(window).width() < 768;
    this.view = this._getViewName();
    this.dates = this._getDates();

    this._getEvents();
  },

  serializeData: function () {
    return {
      title: this.time.format(this._getTitleFormat()),
      showMonth: $(window).width() >= 768
    };
  },

  setShowUnmonitored: function(showUnmonitored) {
    if (this.showUnmonitored !== showUnmonitored) {
      this.showUnmonitored = showUnmonitored;
    }
  },

  _getViewName: function () {
    var defaultView = this._isMobile ? 'day' : 'week';

    return Config.getValue(this.storageKey, defaultView);
  },

  _getDates: function () {
    var view = this.view;
    var time = this.time;
    var weekName = this.firstDayOfWeek === 0 ? 'week' : 'isoWeek';
    var start = time.clone().startOf('day');
    var end = time.clone().endOf('day');

    if (view === 'week') {
      start = time.clone().startOf(weekName);
      end = time.clone().endOf(weekName);
    } else if (view === 'month') {
      start = time.clone().startOf('month').startOf(weekName);
      end = time.clone().endOf('month').endOf(weekName);
    }

    var range = moment.range(start, end);
    var days = [];

    range.by('days', function(moment) {
      days.push(moment);
    });

    return {
      start : start,
      end   : end,
      range : range,
      days  : days
    };
  },

  _getEvents: function() {
    this.collection.fetch({
      data: {
        start: this.dates.start.toISOString(),
        end: this.dates.end.toISOString(),
        unmonitored: this.showUnmonitored
      }
    });
  },

  _reloadCalendarEvents: function() {
    var dayFormat = 'YYYY-MM-DD';

    var groupedEvents = this.collection.groupBy(function (model) {
      return moment(model.get('airDateUtc')).format(dayFormat);
    });

    this.dayCollection.reset();

   this.dates.days.forEach((day) => {
      const calendarDayModel = new CalendarDayModel({
        view   : this.view,
        date   : day.toISOString(),
        events : new CalendarDayEventCollection(groupedEvents[day.format(dayFormat)])
      });

      this.dayCollection.add(calendarDayModel);
    });

    this.headersRegion.show(new CalendarDayHeaderView({
      view: this.view,
      headerFormat: this._getHeaderFormat(),
      days: this.dates.days
    }));

    this.daysRegion.show(new CalendarDayCollectionView({
      collection: this.dayCollection
    }));
  },

  _getTitleFormat: function () {
    switch (this.view) {
      case 'week':
        return UiSettings.get('shortDateFormat');
      case 'month':
        return 'MMMM YYYY';
      default:
        return UiSettings.get('longDateFormat');
    }
  },

  _getHeaderFormat: function () {
    switch (this.view) {
      case 'week':
        return UiSettings.get('calendarWeekColumnHeader');
      case 'month':
        return 'ddd';
      default:
        return 'dddd';
    }
  },

  _changeView: function (event) {
    var $target = $(event.target);
    var view = $target.data('view');

    Config.setValue(this.storageKey, view);

    this.time = moment();
    this.view = this._getViewName();
    this.dates = this._getDates();
    this._getEvents();
  }
});