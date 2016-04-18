var $ = require('jquery');
var Marionette = require('marionette');
var moment = require('moment');
var CalendarCollection = require('../CalendarCollection');
var UiSettings = require('Shared/UiSettingsModel');
var Config = require('Config');
var CalendarAgendaCollectionView = require('./Agenda/CalendarAgendaCollectionView');
var CalendarDayCollectionView = require('./Day/CalendarDayCollectionView');
var CalendarDayEventCollection = require('./Day/CalendarDayEventCollection');
var CalendarDayCollection = require('./Day/CalendarDayCollection');
var CalendarDayModel = require('./Day/CalendarDayModel');
var CalendarDayHeaderView = require('./Day/CalendarDayHeaderView');

require('Mixins/backbone.signalr.mixin');
require('jquery.easypiechart');
require('momentRange');

module.exports = Marionette.LayoutView.extend({
  template: 'Calendar/Calendar/CalendarView',
  storageKey: 'calendar.view',

  regions: {
    headersRegion: '.x-calendar-day-headers',
    daysRegion: '.x-calendar-days'
  },

  events: {
    'click .x-view-select': '_onViewClick',
    'click .x-navigate': '_onNavigateClick'
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
    forecast: '.x-forecast',
    day: '.x-day',
    agenda: '.x-agenda',
    mobileViewButtonText: '.x-calendar-mobile-view-button-text'
  },

  initialize() {
    this.showUnmonitored = Config.getValue('calendar.show', 'monitored') === 'all';
    this.collection = new CalendarCollection().bindSignalR({ updateOnly: true });
    this.dayCollection = new CalendarDayCollection();

    // TODO: Make sure this doesn't re-render the entire calendar when one event is updated
    this.listenTo(this.collection, 'sync', this._showCalendar);

    this.time = moment();
  },

  onBeforeRender() {
    this.firstDayOfWeek = UiSettings.get('firstDayOfWeek');
    this.isMobile = $(window).width() < 768;
    this.view = this._getViewName();
    this.dates = this._getDates();
  },

  onShow() {
    this._disableButtons();
    this._reloadEvents();
  },

  serializeData() {
    return {
      showMonth: $(window).width() >= 768
    };
  },

  setShowUnmonitored(showUnmonitored) {
    if (this.showUnmonitored !== showUnmonitored) {
      this.showUnmonitored = showUnmonitored;
    }
  },

  _getViewName() {
    var defaultView = this._isMobile ? 'day' : 'week';

    return Config.getValue(this.storageKey, defaultView);
  },

  _getDates() {
    var view = this.view;
    var time = this.time;
    var weekName = this.firstDayOfWeek === 0 ? 'week' : 'isoWeek';
    var start = time.clone().startOf('day');
    var end = time.clone().endOf('day');

    if (view === 'week') {
      start = time.clone().startOf(weekName);
      end = time.clone().endOf(weekName);
    } else if (view === 'forecast') {
      this.time = moment();
      time = this.time;
      start = time.clone().subtract(1, 'day').startOf('day');
      end = time.clone().add(5, 'days').endOf('day');
    } else if (view === 'month') {
      start = time.clone().startOf('month').startOf(weekName);
      end = time.clone().endOf('month').endOf(weekName);
    } else if (view === 'agenda') {
      start = time.clone().startOf('day');
      end = time.clone().endOf('month');
    }

    var range = moment.range(start, end);
    var days = [];

    range.by('days', (day) => {
      days.push(day);
    });

    return {
      start,
      end,
      range,
      days
    };
  },

  _getEvents() {
    this.collection.fetch({
      data: {
        start: this.dates.start.toISOString(),
        end: this.dates.end.toISOString(),
        unmonitored: this.showUnmonitored
      }
    });
  },

  _showCalendar() {
    var dayFormat = 'YYYY-MM-DD';

    var groupedEvents = this.collection.groupBy((model) => {
      return moment(model.get('airDateUtc')).format(dayFormat);
    });

    this.dayCollection.reset();

    this.dates.days.forEach((day) => {
      const events = groupedEvents[day.format(dayFormat)];

      if (this.view === 'agenda' && !events) {
        return;
      }

      const calendarDayModel = new CalendarDayModel({
        view: this.view,
        date: day.toISOString(),
        events: new CalendarDayEventCollection(events)
      });

      this.dayCollection.add(calendarDayModel);
    });

    if (this.view === 'agenda') {
      this.headersRegion.empty();

      this.daysRegion.show(new CalendarAgendaCollectionView({
        collection: this.dayCollection
      }));
    } else {
      this.headersRegion.show(new CalendarDayHeaderView({
        view: this.view,
        days: this.dates.days
      }));

      this.daysRegion.show(new CalendarDayCollectionView({
        collection: this.dayCollection
      }));
    }

    this.ui.calendar.removeClass('day week month');
    this.ui.calendar.addClass(this.view);
    this.ui.viewSelectButtons.removeClass('active');
    this.ui[this.view].addClass('active');
    this.ui.loading.addClass('hidden');
    this.ui.title.html(this._getTitle());
    this._setMobileButtonText(this.view);
  },

  _getTitle() {
    if (this.view === 'day') {
      return this.time.format(UiSettings.get('longDateFormat'));
    } else if (this.view === 'month') {
      return this.time.format('MMMM YYYY');
    } else if (this.view === 'agenda') {
      return 'Agenda';
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

    return `${startDate.format(start)} &mdash; ${endDate.format(end)}`;
  },

  _onViewClick(event) {
    event.preventDefault();

    var $target = $(event.target);
    var view = $target.data('view');

    if (view !== this.view) {
      this._changeView(view);
    }
  },

  _onNavigateClick(event) {
    var $target = $(event.target).closest('.x-navigate');
    var navigate = $target.data('navigate');

    if ($target.hasClass('disabled')) {
      return;
    }

    if (navigate === 'previous') {
      this.time = this.time.subtract(1, `${this.view}s`);
    } else if (navigate === 'next') {
      this.time = this.time.add(1, `${this.view}s`);
    } else {
      this.time = moment();
    }

    this._reloadEvents();
  },

  _changeView(view) {
    Config.setValue(this.storageKey, view);
    this.view = view;

    this._disableButtons();
    this._reloadEvents();
  },

  _reloadEvents() {
    this.ui.loading.removeClass('hidden');
    this.dates = this._getDates();
    this._getEvents();
  },

  _disableButtons() {
    var showingForecastView = this.view === 'forecast';

    this.ui.previous.toggleClass('disabled', showingForecastView);
    this.ui.next.toggleClass('disabled', showingForecastView);
  },

  _setMobileButtonText(view) {
    this.ui.mobileViewButtonText.text(view);
  }
});
