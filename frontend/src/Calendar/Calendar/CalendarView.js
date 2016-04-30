const $ = require('jquery');
const Marionette = require('marionette');
const moment = require('moment');
const CalendarCollection = require('../CalendarCollection');
const UiSettings = require('Shared/UiSettingsModel');
const Config = require('Config');
const CalendarAgendaCollectionView = require('./Agenda/CalendarAgendaCollectionView');
const CalendarDayCollectionView = require('./Day/CalendarDayCollectionView');
const CalendarDayEventCollection = require('./Day/CalendarDayEventCollection');
const CalendarDayCollection = require('./Day/CalendarDayCollection');
const CalendarDayModel = require('./Day/CalendarDayModel');
const CalendarDayHeaderView = require('./Day/CalendarDayHeaderView');

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
    const defaultView = this._isMobile ? 'day' : 'week';

    return Config.getValue(this.storageKey, defaultView);
  },

  _getDates() {
    const view = this.view;
    const weekName = this.firstDayOfWeek === 0 ? 'week' : 'isoWeek';
    let time = this.time;
    let start = time.clone().startOf('day');
    let end = time.clone().endOf('day');

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

    const range = moment.range(start, end);
    const days = [];

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
    const dayFormat = 'YYYY-MM-DD';

    const groupedEvents = this.collection.groupBy((model) => {
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

    const startDate = this.dates.start;
    const endDate = this.dates.end;

    let start = 'MMM D YYYY';
    let end = 'MMM D YYYY';

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

    const $target = $(event.target);
    const view = $target.data('view');

    if (view !== this.view) {
      this._changeView(view);
    }
  },

  _onNavigateClick(event) {
    const $target = $(event.target).closest('.x-navigate');
    const navigate = $target.data('navigate');

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
    const showingForecastView = this.view === 'forecast';

    this.ui.previous.toggleClass('disabled', showingForecastView);
    this.ui.next.toggleClass('disabled', showingForecastView);
  },

  _setMobileButtonText(view) {
    this.ui.mobileViewButtonText.text(view);
  }
});
