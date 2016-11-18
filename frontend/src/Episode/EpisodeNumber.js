import React, { PropTypes } from 'react';

function EpisodeNumber(props) {
  const {
    episodeNumber,
    absoluteEpisodeNumber,
    seriesType,
    sceneSeasonNumber,
    sceneEpisodeNumber,
    sceneAbsoluteEpisodeNumber
  } = props;

  if (seriesType === 'anime') {
    return (
      <span>
        {episodeNumber}

        {
          absoluteEpisodeNumber &&
            <span>({absoluteEpisodeNumber})</span>
        }
      </span>
    );
  }

  return (
    <span>
      {episodeNumber}
    </span>
  );
}

EpisodeNumber.propTypes = {
  seasonNumber: PropTypes.number.isRequired,
  episodeNumber: PropTypes.number.isRequired,
  absoluteEpisodeNumber: PropTypes.number,
  seriesType: PropTypes.string,
  sceneSeasonNumber: PropTypes.number,
  sceneEpisodeNumber: PropTypes.number,
  sceneAbsoluteEpisodeNumber: PropTypes.number
};

export default EpisodeNumber;
