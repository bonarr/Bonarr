import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import hasDifferentItems from 'Utilities/Object/hasDifferentItems';
import selectUniqueIds from 'Utilities/Object/selectUniqueIds';
import * as calendarActions from 'Stores/Actions/calendarActions';
import { fetchEpisodeFiles, clearEpisodeFiles } from 'Stores/Actions/episodeFileActions';
import { fetchQueueDetails, clearQueueDetails } from 'Stores/Actions/queueActions';
import Calendar from './Calendar';

function createMapStateToProps() {
  return createSelector(
    (state) => state.calendar,
    (calendar) => {
      return calendar;
    }
  );
}

const mapDispatchToProps = {
  ...calendarActions,
  fetchEpisodeFiles,
  clearEpisodeFiles,
  fetchQueueDetails,
  clearQueueDetails
};

class CalendarConnector extends Component {

  //
  // Lifecycle

  componentDidMount() {
    this.props.gotoCalendarToday();
  }

  componentWillReceiveProps(nextProps) {
    if (hasDifferentItems(nextProps.items, this.props.items)) {
      const episodeIds = selectUniqueIds(nextProps.items, 'id');
      const episodeFileIds = selectUniqueIds(nextProps.items, 'episodeFileId');

      this.props.fetchQueueDetails({ episodeIds });

      if (episodeFileIds.length) {
        this.props.fetchEpisodeFiles({ episodeFileIds });
      }
    }
  }

  componentWillUnmount() {
    this.props.clearCalendar();
    this.props.clearQueueDetails();
    this.props.clearEpisodeFiles();
  }

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
      <Calendar
        {...this.props}
        onCalendarViewChange={this.onCalendarViewChange}
        onTodayPress={this.onTodayPress}
        onPreviousPress={this.onPreviousPress}
        onNextPress={this.onNextPress}
      />
    );
  }
}

CalendarConnector.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCalendarView: PropTypes.func.isRequired,
  gotoCalendarToday: PropTypes.func.isRequired,
  gotoCalendarPreviousRange: PropTypes.func.isRequired,
  gotoCalendarNextRange: PropTypes.func.isRequired,
  clearCalendar: PropTypes.func.isRequired,
  fetchEpisodeFiles: PropTypes.func.isRequired,
  clearEpisodeFiles: PropTypes.func.isRequired,
  fetchQueueDetails: PropTypes.func.isRequired,
  clearQueueDetails: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(CalendarConnector);
