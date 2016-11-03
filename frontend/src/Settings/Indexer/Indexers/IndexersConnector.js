import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchIndexers, deleteIndexer } from 'Stores/Actions/settingsActions';
import Indexers from './Indexers';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.indexers,
    (indexers) => {
      return {
        ...indexers
      };
    }
  );
}

const mapDispatchToProps = {
  fetchIndexers,
  deleteIndexer
};

class IndexersConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchIndexers();
  }

  //
  // Listeners

  onConfirmDeleteIndexer = (id) => {
    this.props.deleteIndexer({ id });
  }

  //
  // Render

  render() {
    return (
      <Indexers
        {...this.props}
        onConfirmDeleteIndexer={this.onConfirmDeleteIndexer}
      />
    );
  }
}

IndexersConnector.propTypes = {
  fetchIndexers: PropTypes.func.isRequired,
  deleteIndexer: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(IndexersConnector);
