import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createEpisodeSelector from 'Stores/Selectors/createEpisodeSelector';
import createQueueItemSelector from 'Stores/Selectors/createQueueItemSelector';
import createEpisodeFileSelector from 'Stores/Selectors/createEpisodeFileSelector';
import EpisodeStatus from './EpisodeStatus';

function createMapStateToProps() {
  return createSelector(
    createEpisodeSelector(),
    createQueueItemSelector(),
    createEpisodeFileSelector(),
    (episode, queueItem, episodeFile) => {
      const result = _.pick(episode, [
        'airDateUtc',
        'monitored',
        'grabbed'
      ]);

      result.queueItem = queueItem;
      result.episodeFile = episodeFile;

      return result;
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
