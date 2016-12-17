import _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';
import * as calendarViews from 'Calendar/calendarViews';
import * as types from './actionTypes';
import { set, update } from './baseActions';
import { fetchCalendar } from './calendarActions';

const viewRanges = {
  [calendarViews.DAY]: 'day',
  [calendarViews.WEEK]: 'week',
  [calendarViews.MONTH]: 'month',
  [calendarViews.FORECAST]: 'week'
};

function getDays(start, end) {
  const startTime = moment(start);
  const endTime = moment(end);
  const difference = endTime.diff(startTime, 'days');

  // Difference is one less than the number of days we need to account for.
  return _.times(difference + 1, (i) => {
    return startTime.clone().add(i, 'days').toISOString();
  });
}

function getDates(state, firstDayOfWeek) {
  const weekName = firstDayOfWeek === 0 ? 'week' : 'isoWeek';
  const view = state.view;
  const time = moment(state.time);

  let start = time.clone().startOf('day');
  let end = time.clone().endOf('day');

  if (view === calendarViews.WEEK) {
    start = time.clone().startOf(weekName);
    end = time.clone().endOf(weekName);
  }

  if (view === calendarViews.FORECAST) {
    start = time.clone().subtract(1, 'day').startOf('day');
    end = time.clone().add(5, 'days').endOf('day');
  }

  if (view === calendarViews.MONTH) {
    start = time.clone().startOf('month').startOf(weekName);
    end = time.clone().endOf('month').endOf(weekName);
  }

  if (view === calendarViews.AGENDA) {
    start = time.clone().subtract(1, 'day').startOf('day');
    end = time.clone().add(1, 'month').endOf('day');
  }

  return {
    start: start.toISOString(),
    end: end.toISOString(),
    time: time.toISOString(),
    dates: getDays(start, end)
  };
}

const section = 'calendar';

const calendarActionHandlers = {
  [types.FETCH_CALENDAR]: function(payload) {
    return function(dispatch, getState) {
      dispatch(set({ section, fetching: true }));

      const state = getState().calendar;

      const {
        unmonitored,
        start,
        end
      } = state;

      const promise = $.ajax({
        url: '/calendar',
        data: {
          unmonitored,
          start,
          end
        }
      });

      promise.done((data) => {
        dispatch(update({ section, data }));

        dispatch(set({
          section,
          fetching: false,
          populated: true,
          error: null
        }));
      });

      promise.fail((xhr) => {
        dispatch(set({
          section,
          fetching: false,
          populated: false,
          error: xhr
        }));
      });
    };
  },

  [types.SET_CALENDAR_INCLUDE_UNMONITORED]: function(payload) {
    return function(dispatch, getState) {
      dispatch(set({
        section,
        unmonitored: payload.unmonitored
      }));

      dispatch(fetchCalendar());
    };
  },

  [types.SET_CALENDAR_VIEW]: function(payload) {
    return function(dispatch, getState) {
      const state = getState();

      const dates = getDates({
        ...state.calendar,
        ...payload,
        time: payload.view === calendarViews.FORECAST ? moment() : state.calendar.time,
        firstDayOfWeek: state.settings.ui.firstDayOfWeek || 0
      });

      dispatch(set({
        section,
        view: payload.view,
        ...dates
      }));

      dispatch(fetchCalendar());
    };
  },

  [types.GOTO_CALENDAR_TODAY]: function(payload) {
    return function(dispatch, getState) {
      const state = getState();

      const dates = getDates({
        ...state.calendar,
        time: moment(),
        firstDayOfWeek: state.settings.ui.firstDayOfWeek
      });

      dispatch(set({
        section,
        ...dates
      }));

      dispatch(fetchCalendar());
    };
  },

  [types.GOTO_CALENDAR_PREVIOUS_RANGE]: function(payload) {
    return function(dispatch, getState) {
      const state = getState();
      const time = moment(state.calendar.time).subtract(1, viewRanges[state.calendar.view]);

      const dates = getDates({
        ...state.calendar,
        time,
        firstDayOfWeek: state.settings.ui.firstDayOfWeek
      });

      dispatch(set({
        section,
        time,
        ...dates
      }));

      dispatch(fetchCalendar());
    };
  },

  [types.GOTO_CALENDAR_NEXT_RANGE]: function(payload) {
    return function(dispatch, getState) {
      const state = getState();
      const time = moment(state.calendar.time).add(1, viewRanges[state.calendar.view]);

      const dates = getDates({
        ...state.calendar,
        time,
        firstDayOfWeek: state.settings.ui.firstDayOfWeek
      });

      dispatch(set({
        section,
        time,
        ...dates
      }));

      dispatch(fetchCalendar());
    };
  }
};

export default calendarActionHandlers;
