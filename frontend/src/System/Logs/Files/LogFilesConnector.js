import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createCommandsSelector from 'Stores/Selectors/createCommandsSelector';
import { executeCommand, registerFinishCommandHandler, unregisterFinishCommandHandler } from 'Stores/Actions/commandActions';
import { fetchLogFiles } from 'Stores/Actions/systemActions';
import LogFiles from './LogFiles';

const deleteFilesCommandName = 'DeleteLogFiles';

function createMapStateToProps() {
  return createSelector(
    (state) => state.system.logFiles,
    createCommandsSelector(),
    (logFiles, commands) => {
      const {
        fetching,
        items
      } = logFiles;

      const deleteFilesExecuting = _.some(commands, { name: deleteFilesCommandName });

      return {
        fetching,
        items,
        deleteFilesExecuting,
        currentLogView: 'Log Files'
      };
    }
  );
}

const mapDispatchToProps = {
  fetchLogFiles,
  executeCommand,
  registerFinishCommandHandler,
  unregisterFinishCommandHandler
};

class LogFilesConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.registerFinishCommandHandler({
      key: 'logFilesDeleteLogs',
      name: deleteFilesCommandName,
      handler: fetchLogFiles
    });

    this.props.fetchLogFiles();
  }

  componentWillUnmount() {
    this.props.unregisterFinishCommandHandler({ key: 'logFilesDeleteLogs' });
  }

  //
  // Listeners

  onRefreshPress = () => {
    this.props.fetchLogFiles();
  }

  onDeleteFilesPress = () => {
    this.props.executeCommand({ name: deleteFilesCommandName });
  }

  //
  // Render

  render() {
    return (
      <LogFiles
        onRefreshPress={this.onRefreshPress}
        onDeleteFilesPress={this.onDeleteFilesPress}
        {...this.props}
      />
    );
  }
}

LogFilesConnector.propTypes = {
  fetchLogFiles: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired,
  registerFinishCommandHandler: PropTypes.func.isRequired,
  unregisterFinishCommandHandler: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(LogFilesConnector);
