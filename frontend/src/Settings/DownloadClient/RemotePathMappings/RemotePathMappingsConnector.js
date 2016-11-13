import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchRemotePathMappings, deleteRemotePathMapping } from 'Stores/Actions/settingsActions';
import RemotePathMappings from './RemotePathMappings';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.remotePathMappings,
    (state) => state.tags.items,
    (remotePathMappings) => {
      return {
        ...remotePathMappings
      };
    }
  );
}

const mapDispatchToProps = {
  fetchRemotePathMappings,
  deleteRemotePathMapping
};

class RemotePathMappingsConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchRemotePathMappings();
  }

  //
  // Listeners

  onConfirmDeleteRemotePathMapping = (id) => {
    this.props.deleteRemotePathMapping({ id });
  }

  //
  // Render

  render() {
    return (
      <RemotePathMappings
        {...this.state}
        {...this.props}
        onConfirmDeleteRemotePathMapping={this.onConfirmDeleteRemotePathMapping}
      />
    );
  }
}

RemotePathMappingsConnector.propTypes = {
  fetchRemotePathMappings: PropTypes.func.isRequired,
  deleteRemotePathMapping: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(RemotePathMappingsConnector);
