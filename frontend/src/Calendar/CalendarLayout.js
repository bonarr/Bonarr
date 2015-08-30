var vent = require('vent');
var AppLayout = require('../AppLayout');
var Marionette = require('marionette');
var UpcomingLayout = require('./Upcoming/UpcomingLayout');
var CalendarView = require('./CalendarView');
var CalendarFeedView = require('./CalendarFeedView');

module.exports = Marionette.Layout.extend({
    template : 'Calendar/CalendarLayout',

    regions : {
        upcoming : '#x-upcoming',
        calendar : '#x-calendar'
    },

    onShow : function() {
        this._showUpcoming();
        this._showCalendar();
        this._showActionBar();
    },

    _showUpcoming : function() {
        this.upcomingLayout = new UpcomingLayout();
        this.upcoming.show(this.upcomingLayout);
    },

    _showCalendar : function() {
        this.calendarView = new CalendarView();
        this.calendar.show(this.calendarView);
    },

    _showiCal : function() {
        var view = new CalendarFeedView();
        vent.trigger(vent.Commands.OpenFullscreenModal, view);
    },

    _showActionBar : function() {
        var actions = {
            items : [
                {
                    tooltip      : 'Get iCal Link',
                    icon         : 'icon-sonarr-calendar',
                    callback     : this._showiCal
                }
            ]
        };

        var filteringOptions = {
            storeState     : true,
            menuKey        : 'calendar.show',
            defaultAction  : 'monitored',
            callback       : this._setFilter,
            items          : [
                {
                    key      : 'all',
                    title    : 'All',
                    icon     : 'icon-sonarr-all'
                },
                {
                    key      : 'monitored',
                    title    : 'Monitored Only',
                    icon     : 'icon-sonarr-monitored'
                }
            ]
        };

        vent.trigger(vent.Commands.OpenActionBarCommand, {
            parentView : this,
            collection : this.calendarView.collection,
            actions    : actions,
            filtering  : filteringOptions
        });
    },

    _setFilter : function(model) {
        var mode = model.get('key');

        if (mode === 'all') {
            this.calendarView.setShowUnmonitored(true);
            this.upcomingLayout.setShowUnmonitored(true);
        }

        else {
            this.calendarView.setShowUnmonitored(false);
            this.upcomingLayout.setShowUnmonitored(false);
        }
    }
});