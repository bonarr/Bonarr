import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createCommandsSelector from 'Stores/Selectors/createCommandsSelector';
import { executeCommand } from 'Stores/Actions/commandActions';
import * as systemActions from 'Stores/Actions/systemActions';
import commandNames from 'Commands/commandNames';
import LogsTable from './LogsTable';

function createMapStateToProps() {
  return createSelector(
    (state) => state.system.logs,
    createCommandsSelector(),
    (logs, commands) => {
      const result = _.pick(logs, [
        'fetching',
        'items',
        'page',
        'totalPages',
        'totalRecords',
        'sortKey',
        'sortDirection',
        'filterKey',
        'filterValue'
      ]);

      const clearLogExecuting = _.some(commands, { name: commandNames.CLEAR_LOGS });

      return {
        clearLogExecuting,
        ...result
      };
    }
  );
}

const mapDispatchToProps = {
  executeCommand,
  ...systemActions
};

class LogsTableConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchLogs();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.clearLogExecuting && this.props.clearLogExecuting) {
      this.props.gotoLogsFirstPage();
    }
  }

  //
  // Listeners

  onFirstPagePress = () => {
    this.props.gotoLogsFirstPage();
  }

  onPreviousPagePress = () => {
    this.props.gotoLogsPreviousPage();
  }

  onNextPagePress = () => {
    this.props.gotoLogsNextPage();
  }

  onLastPagePress = () => {
    this.props.gotoLogsLastPage();
  }

  onPageSelect = (page) => {
    this.props.gotoLogsPage({ page });
  }

  onSortPress = (sortKey) => {
    this.props.setLogsSort({ sortKey });
  }

  onFilterSelect = (filterKey, filterValue) => {
    this.props.setLogsFilter({ filterKey, filterValue });
  }

  onRefreshPress = () => {
    this.props.gotoLogsFirstPage();
  }

  onClearLogsPress = () => {
    this.props.executeCommand({ name: commandNames.CLEAR_LOGS });
  }

  //
  // Render

  render() {
    return (
      <LogsTable
        onFirstPagePress={this.onFirstPagePress}
        onPreviousPagePress={this.onPreviousPagePress}
        onNextPagePress={this.onNextPagePress}
        onLastPagePress={this.onLastPagePress}
        onPageSelect={this.onPageSelect}
        onSortPress={this.onSortPress}
        onFilterSelect={this.onFilterSelect}
        onRefreshPress={this.onRefreshPress}
        onClearLogsPress={this.onClearLogsPress}
        {...this.props}
      />
    );
  }
}

LogsTableConnector.propTypes = {
  clearLogExecuting: PropTypes.bool.isRequired,
  fetchLogs: PropTypes.func.isRequired,
  gotoLogsFirstPage: PropTypes.func.isRequired,
  gotoLogsPreviousPage: PropTypes.func.isRequired,
  gotoLogsNextPage: PropTypes.func.isRequired,
  gotoLogsLastPage: PropTypes.func.isRequired,
  gotoLogsPage: PropTypes.func.isRequired,
  setLogsSort: PropTypes.func.isRequired,
  setLogsFilter: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(LogsTableConnector);
