import React, { PropTypes } from 'react';
import isBefore from 'Utilities/Date/isBefore';
import formatBytes from 'Utilities/Number/formatBytes';
import { kinds, sizes } from 'Helpers/Props';
import Icon from 'Components/Icon';
import Label from 'Components/Label';
import ProgressBar from 'Components/ProgressBar';
import styles from './EpisodeStatus.css';

function getEpisodeFIleTooltip(episodeFile, quality) {
  const revision = quality.revision;
  const size = formatBytes(episodeFile.size);
  let title = 'Episode downloaded';

  if (revision.real && revision.real > 0) {
    title += '[REAL]';
  }

  if (revision.version && revision.version > 1) {
    title += ' [PROPER]';
  }

  if (size !== '') {
    title += ' - {0}'.format(size);
  }

  return title;
}

function EpisodeStatus(props) {
  const {
    airDateUtc,
    grabbed,
    queueItem,
    episodeFile
  } = props;

  const hasEpisodeFile = !!episodeFile;
  const isQueued = !!queueItem;
  const hasAired = isBefore(airDateUtc);

  if (hasEpisodeFile) {
    const quality = episodeFile.quality;
    const isCutoffNotMet = episodeFile.qualityCutoffNotMet;

    return (
      <div className={styles.center}>
        <Label
          kind={isCutoffNotMet ? kinds.INVERSE : kinds.DEFAULT}
          title={getEpisodeFIleTooltip(episodeFile, quality)}
        >
          {quality.quality.name}
        </Label>
      </div>
    );
  }

  if (isQueued) {
    const progress = 100 - (queueItem.sizeleft / queueItem.size * 100);

    if (progress === 0) {
      return (
        <div className={styles.center}>
          <Icon
            name="icon-sonarr-downloading"
            title="Episode is downloading"
          />
        </div>
      );
    }

    return (
      <div className={styles.center}>
        <ProgressBar
          title={`Episode is downloading - ${progress.toFixed(1)}% ${queueItem.title}`}
          progress={progress}
          kind={kinds.PURPLE}
          size={sizes.MEDIUM}
        />
      </div>
    );
  }

  if (grabbed) {
    return (
      <div className={styles.center}>
        <Icon
          name="icon-sonarr-downloading"
          title="Episode is downloading"
        />
      </div>
    );
  }

  if (!airDateUtc) {
    return (
      <div className={styles.center}>
        <Icon
          name="icon-sonarr-tba"
          title="TBA"
        />
      </div>
    );
  }

  if (hasAired) {
    return (
      <div className={styles.center}>
        <Icon
          name="icon-sonarr-missing"
          title="Episode missing from disk"
        />
      </div>
    );
  }

  return (
    <div className={styles.center}>
      <Icon
        name="icon-sonarr-not-aired"
        title="Episode has not aired"
      />
    </div>
  );
}

EpisodeStatus.propTypes = {
  airDateUtc: PropTypes.string.isRequired,
  grabbed: PropTypes.bool,
  queueItem: PropTypes.object,
  episodeFile: PropTypes.object
};

export default EpisodeStatus;
