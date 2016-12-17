import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setCalendarIncludeUnmonitored } from 'Stores/Actions/calendarActions';
import CalendarPage from './CalendarPage';

function createMapStateToProps() {
  return createSelector(
    (state) => state.calendar,
    (calendar) => {
      return {
        unmonitored: calendar.unmonitored,
        showUpcoming: calendar.showUpcoming
      };
    }
  );
}

const mapDispatchToProps = {
  setCalendarIncludeUnmonitored
};

class CalendarPageConnector extends Component {

  //
  // Listeners

  onUnmonitoredChange = (unmonitored) => {
    this.props.setCalendarIncludeUnmonitored({ unmonitored });
  }

  //
  // Render

  render() {
    return (
      <CalendarPage
        {...this.props}
        onUnmonitoredChange={this.onUnmonitoredChange}
      />
    );
  }
}

CalendarPageConnector.propTypes = {
  setCalendarIncludeUnmonitored: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(CalendarPageConnector);
