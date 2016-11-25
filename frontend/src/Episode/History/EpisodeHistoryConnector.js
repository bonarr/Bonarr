import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchEpisodeHistory, clearEpisodeHistory } from 'Stores/Actions/episodeHistoryActions';
import EpisodeHistory from './EpisodeHistory';

function createMapStateToProps() {
  return createSelector(
    (state) => state.episodeHistory,
    (episodeHistory) => {
      return episodeHistory;
    }
  );
}

const mapDispatchToProps = {
  fetchEpisodeHistory,
  clearEpisodeHistory
};

class EpisodeHistoryConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchEpisodeHistory({ episodeId: this.props.episodeId });
  }

  componentWillUnmount() {
    this.props.clearEpisodeHistory();
  }

  //
  // Listeners

  onMarkAsFailedPress = () => {
    // TODO: Wire up release failure/blacklisting

    //historyActions.failed?blacklist:
  }

  //
  // Render

  render() {
    return (
      <EpisodeHistory
        {...this.props}
        onMarkAsFailedPress={this.onMarkAsFailedPress}
      />
    );
  }
}

EpisodeHistoryConnector.propTypes = {
  episodeId: PropTypes.number.isRequired,
  fetchEpisodeHistory: PropTypes.func.isRequired,
  clearEpisodeHistory: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(EpisodeHistoryConnector);
