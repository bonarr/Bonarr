import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import classNames from 'classNames';
import isSameWeek from 'Utilities/Date/isSameWeek';
import isToday from 'Utilities/Date/isToday';
import isTomorrow from 'Utilities/Date/isTomorrow';
import isYesterday from 'Utilities/Date/isYesterday';
import * as calendarViews from 'Calendar/calendarViews';
import styles from './DayOfWeek.css';

function getRelativeDate(date, shortDateFormat, showRelativeDates) {
  if (!isSameWeek(date) || !showRelativeDates) {
    return moment(date).format(shortDateFormat);
  }

  if (isYesterday(date)) {
    return 'Yesterday';
  }

  if (isToday(date)) {
    return 'Today';
  }

  if (isTomorrow(date)) {
    return 'Tomorrow';
  }

  if (isSameWeek(date)) {
    return moment(date).format('dddd');
  }
}

class DayOfWeek extends Component {

  //
  // Render

  render() {
    const {
      date,
      view,
      isTodaysDate,
      calendarWeekColumnHeader,
      shortDateFormat,
      showRelativeDates
    } = this.props;

    const highlightToday = view !== calendarViews.MONTH && isTodaysDate;
    const momentDate = moment(date);
    let formatedDate = momentDate.format('dddd');

    if (view === calendarViews.WEEK) {
      formatedDate = momentDate.format(calendarWeekColumnHeader);
    } else if (view === calendarViews.FORECAST) {
      formatedDate = getRelativeDate(date, shortDateFormat, showRelativeDates);
    }

    return (
      <div className={classNames(
        styles.dayOfWeek,
        view === calendarViews.DAY && styles.isSingleDay,
        highlightToday && styles.isToday
      )}>
        {formatedDate}
      </div>
    );
  }
}

DayOfWeek.propTypes = {
  date: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  isTodaysDate: PropTypes.bool.isRequired,
  calendarWeekColumnHeader: PropTypes.string.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  showRelativeDates: PropTypes.bool.isRequired
};

export default DayOfWeek;
