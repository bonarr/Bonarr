import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchMetadata } from 'Stores/Actions/settingsActions';
import Metadatas from './Metadatas';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.metadata,
    (metadata) => {
      return {
        ...metadata
      };
    }
  );
}

const mapDispatchToProps = {
  fetchMetadata
};

class MetadatasConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchMetadata();
  }

  //
  // Render

  render() {
    return (
      <Metadatas
        {...this.props}
        onConfirmDeleteMetadata={this.onConfirmDeleteMetadata}
      />
    );
  }
}

MetadatasConnector.propTypes = {
  fetchMetadata: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(MetadatasConnector);
