import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchUpdates } from 'Stores/Actions/systemActions';
import { executeCommand } from 'Stores/Actions/commandActions';
import commandNames from 'Commands/commandNames';
import Updates from './Updates';

function createMapStateToProps() {
  return createSelector(
    (state) => state.system.updates,
    (updates) => {
      const {
        fetching,
        items
      } = updates;

      return {
        fetching,
        items
      };
    }
  );
}

const mapDispatchToProps = {
  fetchUpdates,
  executeCommand
};

class UpdatesConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchUpdates();
  }

  //
  // Listeners

  onInstallLatestPress = () => {
    this.props.executeCommand({ name: commandNames.APPLICATION_UPDATE });
  }

  //
  // Render

  render() {
    return (
      <Updates
        onInstallLatestPress={this.onInstallLatestPress}
        {...this.props}
      />
    );
  }
}

UpdatesConnector.propTypes = {
  fetchUpdates: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(UpdatesConnector);
