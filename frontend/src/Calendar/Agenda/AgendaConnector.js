import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { gotoCalendarToday } from 'Stores/Actions/calendarActions';
import Agenda from './Agenda';

function createMapStateToProps() {
  return createSelector(
    (state) => state.calendar,
    (calendar) => {
      return calendar;
    }
  );
}

const mapDispatchToProps = {
  gotoCalendarToday
};

class AgendaConnector extends Component {

  // TODO: schedule update

  //
  // Render

  render() {
    return (
      <Agenda
        {...this.props}
      />
    );
  }
}

AgendaConnector.propTypes = {
  gotoCalendarToday: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(AgendaConnector);
