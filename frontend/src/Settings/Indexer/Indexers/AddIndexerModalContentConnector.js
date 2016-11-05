import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchIndexerSchema, selectIndexerSchema } from 'Stores/Actions/settingsActions';
import AddIndexerModalContent from './AddIndexerModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.indexerSchema,
    (indexerSchema) => {
      const {
        fetching,
        error,
        populated,
        items
      } = indexerSchema;

      const usenetIndexers = _.filter(items, { protocol: 'usenet' });
      const torrentIndexers = _.filter(items, { protocol: 'torrent' });

      return {
        fetching,
        error,
        populated,
        usenetIndexers,
        torrentIndexers
      };
    }
  );
}

const mapDispatchToProps = {
  fetchIndexerSchema,
  selectIndexerSchema
};

class AddIndexerModalContentConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchIndexerSchema();
  }

  //
  // Listeners

  onIndexerSelect = (indexer) => {
    this.props.selectIndexerSchema({ indexer });
    this.props.onModalClose({ indexerSelected: true });
  }

  //
  // Render

  render() {
    return (
      <AddIndexerModalContent
        {...this.props}
        onIndexerSelect={this.onIndexerSelect}
      />
    );
  }
}

AddIndexerModalContentConnector.propTypes = {
  fetchIndexerSchema: PropTypes.func.isRequired,
  selectIndexerSchema: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(AddIndexerModalContentConnector);
