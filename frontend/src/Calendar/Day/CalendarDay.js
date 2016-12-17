import moment from 'moment';
import React, { PropTypes } from 'react';
import classNames from 'classNames';
import * as calendarViews from 'Calendar/calendarViews';
import CalendarEventConnector from 'Calendar/Events/CalendarEventConnector';
import styles from './CalendarDay.css';

function CalendarDay(props) {
  const {
    date,
    time,
    isTodaysDate,
    events,
    view
  } = props;

  return (
    <div className={classNames(
      styles.day,
      view === calendarViews.DAY && styles.isSingleDay
    )}>
      {
        view === calendarViews.MONTH &&
          <div className={classNames(
            styles.dayOfMonth,
            isTodaysDate && styles.isToday,
            !moment(date).isSame(moment(time), 'month') && styles.isDifferentMonth
          )}>
            {moment(date).date()}
          </div>
      }
      <div>
        {
          events.map((event) => {
            return (
              <CalendarEventConnector
                key={event.id}
                episodeId={event.id}
                {...event}
              />
            );
          })
        }
      </div>
    </div>
  );
}

CalendarDay.propTypes = {
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  isTodaysDate: PropTypes.bool.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  view: PropTypes.string.isRequired
};

export default CalendarDay;
