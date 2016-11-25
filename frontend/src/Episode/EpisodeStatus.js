import React, { PropTypes } from 'react';
import isBefore from 'Utilities/Date/isBefore';
import { kinds, sizes } from 'Helpers/Props';
import Icon from 'Components/Icon';
import ProgressBar from 'Components/ProgressBar';
import EpisodeQuality from './EpisodeQuality';
import styles from './EpisodeStatus.css';

function EpisodeStatus(props) {
  const {
    airDateUtc,
    monitored,
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
      <EpisodeQuality
        quality={quality}
        size={episodeFile.size}
        isCutoffNotMet={isCutoffNotMet}
      />
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

  if (!monitored) {
    return (
      <div className={styles.center}>
        <Icon
          name="icon-sonarr-unmonitored"
          title="Episode is not monitored"
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
  monitored: PropTypes.bool.isRequired,
  grabbed: PropTypes.bool,
  queueItem: PropTypes.object,
  episodeFile: PropTypes.object
};

export default EpisodeStatus;
