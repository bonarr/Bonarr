import React, { PropTypes } from 'react';
import formatBytes from 'Utilities/Number/formatBytes';
import { kinds } from 'Helpers/Props';
import Label from 'Components/Label';

function getTooltip(quality, size) {
  const revision = quality.revision;
  let title = 'Episode downloaded';

  if (revision.real && revision.real > 0) {
    title += '[REAL]';
  }

  if (revision.version && revision.version > 1) {
    title += ' [PROPER]';
  }

  if (size) {
    title += ` - ${formatBytes(size)}`;
  }

  return title;
}

function EpisodeQuality({ quality, size, isCutoffNotMet }) {
  return (
    <Label
      kind={isCutoffNotMet ? kinds.INVERSE : kinds.DEFAULT}
      title={getTooltip(quality, size)}
    >
      {quality.quality.name}
    </Label>
  );
}

EpisodeQuality.propTypes = {
  quality: PropTypes.object.isRequired,
  size: PropTypes.number,
  isCutoffNotMet: PropTypes.bool
};

export default EpisodeQuality;
