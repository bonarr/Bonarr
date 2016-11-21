import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
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

class EpisodeDetailsModalContentConnector extends Component {

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
  seriesId: PropTypes.number.isRequired
};

export default connect(createMapStateToProps)(EpisodeDetailsModalContentConnector);
