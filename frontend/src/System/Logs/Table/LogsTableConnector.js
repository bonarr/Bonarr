import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import * as systemActions from 'Stores/Actions/systemActions';
import LogsTable from './LogsTable';

// TODO: use reselect for perfomance improvements
function mapStateToProps(state) {
  const {
    fetching,
    items,
    page,
    totalPages,
    totalRecords
  } = state.system.logs;

  return {
    fetching,
    items,
    page,
    totalPages,
    totalRecords
  };
}

class LogsTableConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchLogs();
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
  gotoLogsPage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, systemActions)(LogsTableConnector);
