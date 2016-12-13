import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { clearReleases } from 'Stores/Actions/releaseActions';
import { toggleEpisodeMonitored } from 'Stores/Actions/episodeActions';
import createEpisodeSelector from 'Stores/Selectors/createEpisodeSelector';
import createSeriesSelector from 'Stores/Selectors/createSeriesSelector';
import EpisodeDetailsModalContent from './EpisodeDetailsModalContent';

function createMapStateToProps() {
  return createSelector(
    createEpisodeSelector(),
    createSeriesSelector(),
    (episode, series) => {
      const {
        title: seriesTitle,
        titleSlug,
        seriesType
      } = series;

      return {
        seriesTitle,
        titleSlug,
        seriesType,
        ...episode
      };
    }
  );
}

const mapDispatchToProps = {
  clearReleases,
  toggleEpisodeMonitored
};

class EpisodeDetailsModalContentConnector extends Component {

  //
  // Lifecycle

  componentWillUnmount() {
    // Clear pending releases here so we can reshow the search
    // results even after switching tabs.

    this.props.clearReleases();
  }

  //
  // Listeners

  onMonitorEpisodePress = (monitored) => {
    const {
      episodeId,
      episodeEntity
    } = this.props;

    this.props.toggleEpisodeMonitored({
      episodeEntity,
      episodeId,
      monitored
    });
  }

  //
  // Render

  render() {
    return (
      <EpisodeDetailsModalContent
        {...this.props}
        onMonitorEpisodePress={this.onMonitorEpisodePress}
      />
    );
  }
}

EpisodeDetailsModalContentConnector.propTypes = {
  episodeId: PropTypes.number.isRequired,
  episodeEntity: PropTypes.string.isRequired,
  seriesId: PropTypes.number.isRequired,
  clearReleases: PropTypes.func.isRequired,
  toggleEpisodeMonitored: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(EpisodeDetailsModalContentConnector);
