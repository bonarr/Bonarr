import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createCommandsSelector from 'Stores/Selectors/createCommandsSelector';
import { executeCommand } from 'Stores/Actions/commandActions';
import { fetchUpdateLogFiles } from 'Stores/Actions/systemActions';
import LogFiles from '../Files/LogFiles';

const deleteFilesCommandName = 'DeleteUpdateLogFiles';

function createMapStateToProps() {
  return createSelector(
    (state) => state.system.updateLogFiles,
    createCommandsSelector(),
    (updateLogFiles, commands) => {
      const {
        fetching,
        items
      } = updateLogFiles;

      const deleteFilesExecuting = _.some(commands, { name: deleteFilesCommandName });

      return {
        fetching,
        items,
        deleteFilesExecuting,
        currentLogView: 'Update Log Files'
      };
    }
  );
}

const mapDispatchToProps = {
  fetchUpdateLogFiles,
  executeCommand
};

class UpdateLogFilesConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchUpdateLogFiles();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.deleteFilesExecuting && this.props.deleteFilesExecuting) {
      this.props.fetchUpdateLogFiles();
    }
  }

  //
  // Listeners

  onRefreshPress = () => {
    this.props.fetchUpdateLogFiles();
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

UpdateLogFilesConnector.propTypes = {
  deleteFilesExecuting: PropTypes.bool.isRequired,
  fetchUpdateLogFiles: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired,
  registerFinishCommandHandler: PropTypes.func.isRequired,
  unregisterFinishCommandHandler: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(UpdateLogFilesConnector);
