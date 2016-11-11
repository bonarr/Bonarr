import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import autobind from 'autobind-decorator';
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

  @autobind
  onFirstPagePress() {
    this.props.gotoLogsFirstPage();
  }

  @autobind
  onPreviousPagePress() {
    this.props.gotoLogsPreviousPage();
  }

  @autobind
  onNextPagePress() {
    this.props.gotoLogsNextPage();
  }

  @autobind
  onLastPagePress() {
    this.props.gotoLogsLastPage();
  }

  @autobind
  onPageSelect(page) {
    this.props.gotoLogsPage({ page });
  }

  @autobind
  onSortPress(sortKey) {
    this.props.setLogsSort({ sortKey });
  }

  @autobind
  onFilterSelect(filterKey, filterValue) {
    this.props.setLogsFilter({ filterKey, filterValue });
  }

  @autobind
  onRefreshPress() {
    this.props.gotoLogsFirstPage();
  }

  @autobind
  onClearLogsPress() {
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
