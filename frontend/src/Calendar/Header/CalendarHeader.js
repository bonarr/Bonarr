import moment from 'moment';
import React, { PropTypes } from 'react';
import { align } from 'Helpers/Props';
import Button from 'Components/Button';
import Icon from 'Components/Icon';
import LoadingIndicator from 'Components/LoadingIndicator';
import * as calendarViews from 'Calendar/calendarViews';
import CalendarHeaderViewButton from './CalendarHeaderViewButton';
import styles from './CalendarHeader.css';

function getTitle(time, start, end, view, longDateFormat) {
  const timeMoment = moment(time);
  const startMoment = moment(start);
  const endMoment = moment(end);

  if (view === 'day') {
    return timeMoment.format(longDateFormat);
  } else if (view === 'month') {
    return timeMoment.format('MMMM YYYY');
  } else if (view === 'agenda') {
    return 'Agenda';
  }

  let startFormat = 'MMM D YYYY';
  let endFormat = 'MMM D YYYY';

  if (startMoment.isSame(endMoment, 'month')) {
    startFormat = 'MMM D';
    endFormat = 'D YYYY';
  } else if (startMoment.isSame(endMoment, 'year')) {
    startFormat = 'MMM D';
    endFormat = 'MMM D YYYY';
  }

  return `${startMoment.format(startFormat)} \u2014 ${endMoment.format(endFormat)}`;
}

function CalendarHeader(props) {
  const {
    fetching,
    time,
    start,
    end,
    view,
    longDateFormat,
    onCalendarViewChange,
    onTodayPress,
    onPreviousPress,
    onNextPress
  } = props;

  return (
    <div className={styles.header}>
      <div className={styles.navigationButtons}>
        <Button
          buttonGroupPosition={align.LEFT}
          onPress={onPreviousPress}
        >
          <Icon name="icon-sonarr-pager-previous" />
        </Button>

        <Button
          buttonGroupPosition={align.RIGHT}
          onPress={onNextPress}
        >
          <Icon name="icon-sonarr-pager-next" />
        </Button>

        <Button
          className={styles.todayButton}
          onPress={onTodayPress}
        >
          Today
        </Button>
      </div>

      <div className={styles.title}>
        {getTitle(time, start, end, view, longDateFormat)}
      </div>

      <div className={styles.viewButtonsContainer}>
        {
          fetching &&
            <LoadingIndicator
              containerClassName={styles.loadingContainer}
              size={20}
            />
        }

        <div>
          <CalendarHeaderViewButton
            view={calendarViews.MONTH}
            selectedView={view}
            buttonGroupPosition={align.LEFT}
            onPress={onCalendarViewChange}
          />

          <CalendarHeaderViewButton
            view={calendarViews.WEEK}
            selectedView={view}
            buttonGroupPosition={align.CENTER}
            onPress={onCalendarViewChange}
          />

          <CalendarHeaderViewButton
            view={calendarViews.FORECAST}
            selectedView={view}
            buttonGroupPosition={align.CENTER}
            onPress={onCalendarViewChange}
          />

          <CalendarHeaderViewButton
            view={calendarViews.DAY}
            selectedView={view}
            buttonGroupPosition={align.CENTER}
            onPress={onCalendarViewChange}
          />

          <CalendarHeaderViewButton
            view={calendarViews.AGENDA}
            selectedView={view}
            buttonGroupPosition={align.RIGHT}
            onPress={onCalendarViewChange}
          />
        </div>
      </div>
    </div>
  );
}

CalendarHeader.propTypes = {
  fetching: PropTypes.bool.isRequired,
  time: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  view: PropTypes.oneOf(calendarViews.all).isRequired,
  longDateFormat: PropTypes.string.isRequired,
  onCalendarViewChange: PropTypes.func.isRequired,
  onTodayPress: PropTypes.func.isRequired,
  onPreviousPress: PropTypes.func.isRequired,
  onNextPress: PropTypes.func.isRequired
};

export default CalendarHeader;
