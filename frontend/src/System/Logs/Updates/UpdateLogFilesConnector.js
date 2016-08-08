import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { executeCommand } from 'Stores/Actions/commandActions';
import { fetchUpdateLogFiles } from 'Stores/Actions/systemActions';
import LogFiles from '../Files/LogFiles';

const deleteFilesTaskName = 'DeleteUpdateLogFiles';

// TODO: use reselect for perfomance improvements
function mapStateToProps(state) {
  const commands = state.commands.items;
  const deleteFilesExecuting = _.some(commands, { name: deleteFilesTaskName });

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
  executeCommand
};

class UpdateLogFilesConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchUpdateLogFiles();
  }

  //
  // Listeners

  @autobind
  onRefreshPress() {
    this.props.fetchUpdateLogFiles();
  }

  @autobind
  onDeleteFilesPress() {
    this.props.executeCommand({ name: deleteFilesTaskName });
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
  executeCommand: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLogFilesConnector);
