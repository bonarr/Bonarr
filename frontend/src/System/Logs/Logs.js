import React, { Component, PropTypes } from 'react';
import LogsTableConnector from './Table/LogsTableConnector';
import LogFilesConnector from './Files/LogFilesConnector';
import UpdateLogFilesConnector from './Updates/UpdateLogFilesConnector';

class Logs extends Component {

  //
  // Render

  render() {
    const view = this.props.view;

    if (view === 'files') {
      return (
        <LogFilesConnector />
      );
    }

    if (view === 'update') {
      return (
        <UpdateLogFilesConnector />
      );
    }

    return (
      <LogsTableConnector />
    );
  }

}

Logs.propTypes = {
  view: PropTypes.string
};

export default Logs;
