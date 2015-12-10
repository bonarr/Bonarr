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
    'click .x-view-select' : '_onViewClick',
    'click .x-navigate'    : '_onNavigateClick'
  },

  ui: {
    calendar: '.x-calendar',
    title: '.x-calendar-header-title',
    viewSelectButtons: '.x-view-select',
    previous: '.x-previous',
    next: '.x-next',
    today: '.x-today',
    loading: '.x-loading-indicator',
    month: '.x-month',
    week: '.x-week',
    day: '.x-day'
  },

  initialize: function() {
    this.showUnmonitored = Config.getValue('calendar.show', 'monitored') === 'all';
    this.collection = new CalendarCollection().bindSignalR({ updateOnly: true });
    this.dayCollection = new CalendarDayCollection();

    // TODO: Make sure this doesn't re-render the entire calendar when one event is updated
    this.listenTo(this.collection, 'sync', this._showCalendar);

    this.time = moment();
  },

  onBeforeRender: function () {
    this.firstDayOfWeek = UiSettings.get('firstDayOfWeek');
    this.isMobile = $(window).width() < 768;
    this.view = this._getViewName();
    this.dates = this._getDates();
  },

  onShow: function () {
    this._reloadEvents();
  },

  serializeData: function () {
    return {
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

  _showCalendar: function() {
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

    this.ui.calendar.removeClass('day week month');
    this.ui.calendar.addClass(this.view);
    this.ui.viewSelectButtons.removeClass('active');
    this.ui[this.view].addClass('active');
    this.ui.loading.addClass('hidden');
    this.ui.title.html(this._getTitle());
  },

  _getTitle: function () {
    if (this.view === 'day') {
      return this.time.format(UiSettings.get('longDateFormat'));
    } else if (this.view === 'month') {
      return this.time.format('MMMM YYYY');
    }

    var startDate = this.dates.start;
    var endDate = this.dates.end;

    var start = 'MMM D YYYY';
    var end = 'MMM D YYYY';

    if (startDate.isSame(endDate, 'month')) {
      start = 'MMM D';
      end = 'D YYYY';
    } else if (startDate.isSame(endDate, 'year')) {
      start = 'MMM D';
      end = 'MMM D YYYY';
  }

    return startDate.format(start) + ' &mdash; ' + endDate.format(end);
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

  _onViewClick: function (event) {
    var $target = $(event.target);
    var view = $target.data('view');

    if (view !== this.view) {
      this._changeView(view);
    }
  },

  _onNavigateClick: function (event) {
    var $target = $(event.target).closest('.x-navigate');
    var navigate = $target.data('navigate');

    if ($target.hasClass('disabled')) {
      return;
    }

    if (navigate === 'previous') {
      this.time = this.time.subtract(1, this.view + 's');
    } else if (navigate === 'next') {
      this.time = this.time.add(1, this.view + 's');
    } else {
      this.time = moment();
    }

    this._reloadEvents();
  },

  _changeView: function (view) {
    Config.setValue(this.storageKey, view);
    this.view = view;

    this._reloadEvents();
  },

  _reloadEvents: function () {
    this.ui.loading.removeClass('hidden');
    this.dates = this._getDates();
    this._getEvents();
  }
});