import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createUISettingsSelector from 'Stores/Selectors/createUISettingsSelector';
import { setCalendarView, gotoCalendarToday, gotoCalendarPreviousRange, gotoCalendarNextRange } from 'Stores/Actions/calendarActions';
import CalendarHeader from './CalendarHeader';

function createMapStateToProps() {
  return createSelector(
    (state) => state.calendar,
    createUISettingsSelector(),
    (calendar, UiSettings) => {
      const result = _.pick(calendar, [
        'fetching',
        'view',
        'time',
        'start',
        'end'
      ]);

      result.longDateFormat = UiSettings.longDateFormat;

      return result;
    }
  );
}

const mapDispatchToProps = {
  setCalendarView,
  gotoCalendarToday,
  gotoCalendarPreviousRange,
  gotoCalendarNextRange
};

class CalendarHeaderConnector extends Component {

  //
  // Listeners

  onCalendarViewChange = (view) => {
    this.props.setCalendarView({ view });
  }

  onTodayPress = () => {
    this.props.gotoCalendarToday();
  }

  onPreviousPress = () => {
    this.props.gotoCalendarPreviousRange();
  }

  onNextPress = () => {
    this.props.gotoCalendarNextRange();
  }

  //
  // Render

  render() {
    return (
      <CalendarHeader
        {...this.props}
        onCalendarViewChange={this.onCalendarViewChange}
        onTodayPress={this.onTodayPress}
        onPreviousPress={this.onPreviousPress}
        onNextPress={this.onNextPress}
      />
    );
  }
}

CalendarHeaderConnector.propTypes = {
  setCalendarView: PropTypes.func.isRequired,
  gotoCalendarToday: PropTypes.func.isRequired,
  gotoCalendarPreviousRange: PropTypes.func.isRequired,
  gotoCalendarNextRange: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(CalendarHeaderConnector);
