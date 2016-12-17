import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import CalendarDayConnector from './CalendarDayConnector';
import styles from './CalendarDays.css';

class CalendarDays extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      todaysDate: moment().startOf('day').toISOString()
    };
  }

  // TODO: Schedule update to update selected day if view is MONTH

  //
  // Render

  render() {
    return (
      <div className={styles.days}>
        {
          this.props.dates.map((date) => {
            return (
              <CalendarDayConnector
                key={date}
                date={date}
                isTodaysDate={date === this.state.todaysDate}
              />
            );
          })
        }
      </div>
    );
  }
}

CalendarDays.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.string).isRequired,
  view: PropTypes.string.isRequired
};

export default CalendarDays;
