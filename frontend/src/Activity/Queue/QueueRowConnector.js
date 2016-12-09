import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { toggleQueueEpisodeMonitored, grabQueueItem, removeQueueItem } from 'Stores/Actions/queueActions';
import createEpisodeSelector from 'Stores/Selectors/createEpisodeSelector';
import createUiSettingsSelector from 'Stores/Selectors/createUiSettingsSelector';
import QueueRow from './QueueRow';

function createMapStateToProps() {
  return createSelector(
    createEpisodeSelector(),
    createUiSettingsSelector(),
    (episode, uiSettings) => {
      const result = _.pick(uiSettings, [
        'showRelativeDates',
        'shortDateFormat',
        'timeFormat'
      ]);

      result.episode = episode;

      return result;
    }
  );
}

const mapDispatchToProps = {
  toggleQueueEpisodeMonitored,
  grabQueueItem,
  removeQueueItem
};

class QueueRowConnector extends Component {

  //
  // Listeners

  onMonitorEpisodePress = (episodeId, monitored) => {
    this.props.toggleQueueEpisodeMonitored({ episodeId, monitored });
  }

  onGrabPress = (blacklist) => {
    this.props.grabQueueItem({ id: this.props.id, blacklist });
  }

  onRemoveQueueItemPress = (blacklist) => {
    this.props.removeQueueItem({ id: this.props.id, blacklist });
  }

  //
  // Render

  render() {
    return (
      <QueueRow
        {...this.props}
        onMonitorEpisodePress={this.onMonitorEpisodePress}
        onGrabPress={this.onGrabPress}
        onRemoveQueueItemPress={this.onRemoveQueueItemPress}
      />
    );
  }
}

QueueRowConnector.propTypes = {
  id: PropTypes.number.isRequired,
  toggleQueueEpisodeMonitored: PropTypes.func.isRequired,
  grabQueueItem: PropTypes.func.isRequired,
  removeQueueItem: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(QueueRowConnector);
