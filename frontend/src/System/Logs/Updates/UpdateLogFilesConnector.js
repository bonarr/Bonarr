import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { executeCommand, registerFinishCommandHandler, unregisterFinishCommandHandler } from 'Stores/Actions/commandActions';
import { fetchUpdateLogFiles } from 'Stores/Actions/systemActions';
import LogFiles from '../Files/LogFiles';

const deleteFilesCommandName = 'DeleteUpdateLogFiles';

// TODO: use reselect for perfomance improvements
function mapStateToProps(state) {
  const commands = state.commands.items;
  const deleteFilesExecuting = _.some(commands, { name: deleteFilesCommandName });

  const {
    fetching,
    items
  } = state.system.updateLogFiles;

  return {
    fetching,
    items,
    deleteFilesExecuting,
    currentLogView: 'Update Log Files'
  };
}

const mapDispatchToProps = {
  fetchUpdateLogFiles,
  executeCommand,
  registerFinishCommandHandler,
  unregisterFinishCommandHandler
};

class UpdateLogFilesConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.registerFinishCommandHandler({
      key: 'updateLogFilesDeleteLogs',
      name: deleteFilesCommandName,
      handler: fetchUpdateLogFiles
    });

    this.props.fetchUpdateLogFiles();
  }

  componentWillUnmount() {
    this.props.unregisterFinishCommandHandler({ key: 'updateLogFilesDeleteLogs' });
  }

  //
  // Listeners

  @autobind
  onRefreshPress() {
    this.props.fetchUpdateLogFiles();
  }

  @autobind
  onDeleteFilesPress() {
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
  fetchUpdateLogFiles: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired,
  registerFinishCommandHandler: PropTypes.func.isRequired,
  unregisterFinishCommandHandler: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLogFilesConnector);
