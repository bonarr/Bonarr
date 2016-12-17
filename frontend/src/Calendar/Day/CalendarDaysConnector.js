import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import CalendarDays from './CalendarDays';

function createMapStateToProps() {
  return createSelector(
    (state) => state.calendar,
    (calendar) => {
      return {
        dates: calendar.dates,
        view: calendar.view
      };
    }
  );
}

export default connect(createMapStateToProps)(CalendarDays);
