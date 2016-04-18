var vent = require('vent');
var Marionette = require('marionette');
var Config = require('Config');
var UpcomingLayout = require('./Upcoming/UpcomingLayout');
var CalendarView = require('./Calendar/CalendarView');
var CalendarFeedView = require('./CalendarFeedView');
var tpl = require('./CalendarLayout.hbs');

module.exports = Marionette.LayoutView.extend({
  template: tpl,

  regions: {
    upcoming: '#x-upcoming',
    calendar: '#x-calendar'
  },

  ui: {
    upcomingContainer: '.upcoming-container'
  },

  events: {
    'click .upcoming-visibility-controls': '_toggleUpcomingVisibility'
  },

  initialize() {
    this.showUpcoming = Config.getValueBoolean('upcoming.show', true);
  },

  onShow() {
    if (this.showUpcoming) {
      this._showUpcoming();
    }

    this.ui.upcomingContainer.toggleClass('show-upcoming', this.showUpcoming);

    this._showCalendar();
    this._showActionBar();
  },

  _showUpcoming() {
    this.upcomingLayout = new UpcomingLayout();
    this.upcoming.show(this.upcomingLayout);
  },

  _showCalendar() {
    this.calendarView = new CalendarView();
    this.calendar.show(this.calendarView);
  },

  _showiCal() {
    var view = new CalendarFeedView();
    vent.trigger(vent.Commands.OpenFullscreenModal, view);
  },

  _showActionBar() {
    var actions = {
      items: [
        {
          tooltip: 'Get iCal Link',
          icon: 'icon-sonarr-calendar',
          callback: this._showiCal
        }
      ]
    };

    var filteringOptions = {
      storeState: true,
      menuKey: 'calendar.show',
      defaultAction: 'monitored',
      callback: this._setFilter,
      items: [
        {
          key: 'all',
          title: 'All',
          icon: 'icon-sonarr-all'
        },
        {
          key: 'monitored',
          title: 'Monitored Only',
          icon: 'icon-sonarr-monitored'
        }
      ]
    };

    vent.trigger(vent.Commands.OpenActionBarCommand, {
      parentView: this,
      collection: this.calendarView.collection,
      actions: actions,
      filtering: filteringOptions
    });
  },

  _setFilter(model) {
    var mode = model.get('key');

    if (mode === 'all') {
      this.calendarView.setShowUnmonitored(true);
      this.upcomingLayout.setShowUnmonitored(true);
    } else {
      this.calendarView.setShowUnmonitored(false);
      this.upcomingLayout.setShowUnmonitored(false);
    }
  },

  _toggleUpcomingVisibility() {
    const showUpcoming = !this.showUpcoming;

    Config.setValue('upcoming.show', showUpcoming);
    this.ui.upcomingContainer.toggleClass('show-upcoming', showUpcoming);
    this.showUpcoming = showUpcoming;

    if (this.showUpcoming) {
      this._showUpcoming();
    } else {
      this.upcoming.empty();
    }
  }
});
