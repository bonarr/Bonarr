import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createCommandsSelector from 'Stores/Selectors/createCommandsSelector';
import { executeCommand, registerFinishCommandHandler, unregisterFinishCommandHandler } from 'Stores/Actions/commandActions';
import * as systemActions from 'Stores/Actions/systemActions';
import LogsTable from './LogsTable';

const clearLogsCommandName = 'ClearLog';

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

      const clearLogExecuting = _.some(commands, { name: clearLogsCommandName });

      return {
        clearLogExecuting,
        ...result
      };
    }
  );
}

const mapDispatchToProps = {
  executeCommand,
  registerFinishCommandHandler,
  unregisterFinishCommandHandler,
  ...systemActions
};

class LogsTableConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.registerFinishCommandHandler({
      key: 'logsTableClearLogs',
      name: clearLogsCommandName,
      handler: systemActions.fetchLogs
    });

    this.props.fetchLogs();
  }

  componentWillUnmount() {
    this.props.unregisterFinishCommandHandler({ key: 'logsTableClearLogs' });
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
    this.props.executeCommand({ name: clearLogsCommandName });
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
  fetchLogs: PropTypes.func.isRequired,
  gotoLogsFirstPage: PropTypes.func.isRequired,
  gotoLogsPreviousPage: PropTypes.func.isRequired,
  gotoLogsNextPage: PropTypes.func.isRequired,
  gotoLogsLastPage: PropTypes.func.isRequired,
  gotoLogsPage: PropTypes.func.isRequired,
  setLogsSort: PropTypes.func.isRequired,
  setLogsFilter: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired,
  registerFinishCommandHandler: PropTypes.func.isRequired,
  unregisterFinishCommandHandler: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(LogsTableConnector);
