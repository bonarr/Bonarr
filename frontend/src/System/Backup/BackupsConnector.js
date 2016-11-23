import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createCommandsSelector from 'Stores/Selectors/createCommandsSelector';
import { fetchBackups } from 'Stores/Actions/systemActions';
import { executeCommand } from 'Stores/Actions/commandActions';
import Backups from './Backups';

const backupCommandName = 'Backup';

function createMapStateToProps() {
  return createSelector(
    (state) => state.system.backups,
    createCommandsSelector(),
    (backups, commands) => {
      const {
        fetching,
        items
      } = backups;

      const backupExecuting = _.some(commands, { name: backupCommandName });

      return {
        fetching,
        items,
        backupExecuting
      };
    }
  );
}

const mapDispatchToProps = {
  fetchBackups,
  executeCommand
};

class BackupsConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchBackups();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.backupExecuting && this.props.backupExecuting) {
      this.props.fetchBackups();
    }
  }

  //
  // Listeners

  onBackupPress = () => {
    this.props.executeCommand({ name: backupCommandName });
  }

  //
  // Render

  render() {
    return (
      <Backups
        onBackupPress={this.onBackupPress}
        {...this.props}
      />
    );
  }
}

BackupsConnector.propTypes = {
  backupExecuting: PropTypes.bool.isRequired,
  fetchBackups: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(BackupsConnector);
