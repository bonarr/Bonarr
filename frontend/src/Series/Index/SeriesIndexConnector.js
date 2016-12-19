import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createCommandsSelector from 'Stores/Selectors/createCommandsSelector';
import { fetchSeries } from 'Stores/Actions/seriesActions';
import { setSeriesSort, setSeriesFilter, setSeriesView } from 'Stores/Actions/seriesIndexActions';
import { executeCommand } from 'Stores/Actions/commandActions';
import commandNames from 'Commands/commandNames';
import SeriesIndex from './SeriesIndex';

function createMapStateToProps() {
  return createSelector(
    (state) => state.series,
    (state) => state.seriesIndex,
    createCommandsSelector(),
    (series, seriesIndex, commands) => {
      const isRefreshingSeries = _.some(commands, { name: commandNames.REFRESH_SERIES });
      const isRssSyncExecuting = _.some(commands, { name: commandNames.RSS_SYNC });

      return {
        isRefreshingSeries,
        isRssSyncExecuting,
        ...series,
        ...seriesIndex
      };
    }
  );
}

const mapDispatchToProps = {
  fetchSeries,
  setSeriesSort,
  setSeriesFilter,
  setSeriesView,
  executeCommand
};

class SeriesIndexConnector extends Component {

  //
  // Lifecycle

  componentDidMount() {
    this.props.fetchSeries();
  }

  //
  // Listeners

  onSortSelect = (sortKey) => {
    this.props.setSeriesSort({ sortKey });
  }

  onFilterSelect = (filterKey, filterValue, filterType) => {
    this.props.setSeriesFilter({ filterKey, filterValue, filterType });
  }

  onViewSelect = (view) => {
    this.props.setSeriesView({ view });
  }

  onRefreshSeriesPress = () => {
    this.props.executeCommand({
      name: commandNames.REFRESH_SERIES
    });
  }

  onRssSyncPress = () => {
    this.props.executeCommand({
      name: commandNames.RSS_SYNC
    });
  }

  //
  // Render

  render() {
    return (
      <SeriesIndex
        {...this.props}
        onSortSelect={this.onSortSelect}
        onFilterSelect={this.onFilterSelect}
        onViewSelect={this.onViewSelect}
        onRefreshSeriesPress={this.onRefreshSeriesPress}
        onRssSyncPress={this.onRssSyncPress}
      />
    );
  }
}

SeriesIndexConnector.propTypes = {
  fetchSeries: PropTypes.func.isRequired,
  setSeriesSort: PropTypes.func.isRequired,
  setSeriesFilter: PropTypes.func.isRequired,
  setSeriesView: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(SeriesIndexConnector);
