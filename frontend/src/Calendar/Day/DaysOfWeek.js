import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import DayOfWeek from './DayOfWeek';
import * as calendarViews from 'Calendar/calendarViews';
import styles from './DaysOfWeek.css';

class DaysOfWeek extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      todaysDate: moment().startOf('day').toISOString()
    };
  }

  // TODO: Schedule update to update selected day if view is not MONTH

  //
  // Render

  render() {
    const {
      dates,
      view,
      ...otherProps
    } = this.props;

    if (view === calendarViews.AGENDA) {
      return null;
    }

    return (
      <div className={styles.daysOfWeek}>
        {
          dates.map((date) => {
            return (
              <DayOfWeek
                key={date}
                date={date}
                view={view}
                isTodaysDate={date === this.state.todaysDate}
                {...otherProps}
              />
            );
          })
        }
      </div>
    );
  }
}

DaysOfWeek.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.string),
  view: PropTypes.string.isRequired
};

export default DaysOfWeek;
