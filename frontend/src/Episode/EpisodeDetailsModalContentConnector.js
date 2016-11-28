import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { clearReleases } from 'Stores/Actions/releaseActions';
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
  clearReleases
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
  // Render

  render() {
    return (
      <EpisodeDetailsModalContent
        {...this.props}
      />
    );
  }
}

EpisodeDetailsModalContentConnector.propTypes = {
  seriesId: PropTypes.number.isRequired,
  clearReleases: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(EpisodeDetailsModalContentConnector);
