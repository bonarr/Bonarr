import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createQueueItemSelector from 'Stores/Selectors/createQueueItemSelector';
import createEpisodeFileSelector from 'Stores/Selectors/createEpisodeFileSelector';
import EpisodeStatus from './EpisodeStatus';

// TODO: Get item from Queue
// TODO: Get episode file

function createMapStateToProps() {
  return createSelector(
    createQueueItemSelector(),
    createEpisodeFileSelector(),
    (queueItem, episodeFile) => {
      return {
        queueItem,
        episodeFile
      };
    }
  );
}

const mapDispatchToProps = {
};

class EpisodeStatusConnector extends Component {

  //
  // Render

  render() {
    return (
      <EpisodeStatus
        {...this.props}
      />
    );
  }
}

EpisodeStatusConnector.propTypes = {
  episodeId: PropTypes.number.isRequired,
  episodeFileId: PropTypes.number.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(EpisodeStatusConnector);
