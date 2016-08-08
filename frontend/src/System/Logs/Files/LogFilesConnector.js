import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { executeCommand } from 'Stores/Actions/commandActions';
import { fetchLogFiles } from 'Stores/Actions/systemActions';
import LogFiles from './LogFiles';

const deleteFilesTaskName = 'DeleteLogFiles';

// TODO: use reselect for perfomance improvements
function mapStateToProps(state) {
  const commands = state.commands.items;
  const deleteFilesExecuting = _.some(commands, { name: deleteFilesTaskName });

  const {
    fetching,
    items
  } = state.system.logFiles;

  return {
    fetching,
    items,
    deleteFilesExecuting,
    currentLogView: 'Log Files'
  };
}

const mapDispatchToProps = {
  fetchLogFiles,
  executeCommand
};

class LogFilesConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchLogFiles();
  }

  //
  // Listeners

  @autobind
  onRefreshPress() {
    this.props.fetchLogFiles();
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

LogFilesConnector.propTypes = {
  fetchLogFiles: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LogFilesConnector);
