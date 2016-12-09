import React, { Component, PropTypes } from 'react';
import IconButton from 'Components/IconButton';
import SpinnerIconButton from 'Components/SpinnerIconButton';
import ProgressBar from 'Components/ProgressBar';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import ProtocolLabel from 'Activity/Queue/ProtocolLabel';
import EpisodeTitleLink from 'Episode/EpisodeTitleLink';
import EpisodeQuality from 'Episode/EpisodeQuality';
import SeasonEpisodeNumber from 'Episode/SeasonEpisodeNumber';
import ManualImportModal from 'ManualImport/ManualImportModal';
import SeriesTitleLink from 'Series/SeriesTitleLink';
import QueueStatusCell from './QueueStatusCell';
import TimeleftCell from './TimeleftCell';
import RemoveQueueItemModal from './RemoveQueueItemModal';
import styles from './QueueRow.css';

class QueueRow extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isRemoveQueueItemModalOpen: false,
      isManualImportModalOpen: false
    };
  }

  //
  // Listeners

  onRemoveQueueItemPress = () => {
    this.setState({ isRemoveQueueItemModalOpen: true });
  }

  onRemoveQueueItemModalConfirmed = (blacklist) => {
    this.props.onRemoveQueueItemPress(blacklist);
    this.setState({ isRemoveQueueItemModalOpen: false });
  }

  onRemoveQueueItemModalClose = () => {
    this.setState({ isRemoveQueueItemModalOpen: false });
  }

  onManualImportPress = () => {
    this.setState({ isManualImportModalOpen: true });
  }

  onManualImportModalClose = () => {
    this.setState({ isManualImportModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      downloadId,
      title,
      status,
      trackedDownloadStatus,
      statusMessages,
      series,
      episode,
      quality,
      protocol,
      estimatedCompletionTime,
      timeleft,
      size,
      sizeleft,
      showRelativeDates,
      shortDateFormat,
      timeFormat,
      grabbing,
      removing,
      onMonitorEpisodePress,
      onGrabPress
    } = this.props;

    const {
      isRemoveQueueItemModalOpen,
      isManualImportModalOpen
    } = this.state;

    const progress = 100 - (sizeleft / size * 100);
    const showManualImport = status === 'Completed' && trackedDownloadStatus === 'Warning';
    const isPending = status === 'Pending';

    return (
      <TableRow>
        <QueueStatusCell
          sourceTitle={title}
          status={status.toLowerCase()}
          trackedDownloadStatus={trackedDownloadStatus && trackedDownloadStatus.toLowerCase()}
          statusMessages={statusMessages}
        />

        <TableRowCell>
          <SeriesTitleLink
            titleSlug={series.titleSlug}
            title={series.title}
          />
        </TableRowCell>

        <TableRowCell>
          <EpisodeTitleLink
            episodeId={episode.id}
            seriesId={series.id}
            episodeFileId={episode.episodeFileId}
            episodeEntity="queue.episodes"
            episodeTitle={episode.title}
            showOpenSeriesButton={true}
            onMonitorEpisodePress={onMonitorEpisodePress}
          />
        </TableRowCell>

        <TableRowCell>
          <SeasonEpisodeNumber
            seasonNumber={episode.seasonNumber}
            episodeNumber={episode.episodeNumber}
            absoluteEpisodeNumber={episode.absoluteEpisodeNumber}
            seriesType={series.seriesType}
            sceneSeasonNumber={episode.sceneSeasonNumber}
            sceneEpisodeNumber={episode.sceneEpisodeNumber}
            sceneAbsoluteEpisodeNumber={episode.sceneAbsoluteEpisodeNumber}
          />
        </TableRowCell>

        <TableRowCell className={styles.quality}>
          <EpisodeQuality
            quality={quality}
          />
        </TableRowCell>

        <TableRowCell className={styles.protocol}>
          <ProtocolLabel
            protocol={protocol}
          />
        </TableRowCell>

        <TimeleftCell
          status={status.toLowerCase()}
          estimatedCompletionTime={estimatedCompletionTime}
          timeleft={timeleft}
          size={size}
          sizeleft={sizeleft}
          showRelativeDates={showRelativeDates}
          shortDateFormat={shortDateFormat}
          timeFormat={timeFormat}
        />

        <TableRowCell className={styles.progress}>
          {
            !!progress &&
              <ProgressBar
                progress={progress}
                title={`${progress.toFixed(1)}%`}
              />
          }
        </TableRowCell>

        <TableRowCell className={styles.actions}>
          {
            showManualImport &&
              <IconButton
                name="icon-sonarr-import-manual"
                onPress={this.onManualImportPress}
              />
          }

          {
            isPending &&
              <SpinnerIconButton
                name="icon-sonarr-download"
                isSpinning={grabbing}
                onPress={onGrabPress}
              />
          }

          <SpinnerIconButton
            name="icon-sonarr-delete-row"
            isSpinning={removing}
            onPress={this.onRemoveQueueItemPress}
          />
        </TableRowCell>

        <ManualImportModal
          isOpen={isManualImportModalOpen}
          downloadId={downloadId}
          title={title}
          onModalClose={this.onManualImportModalClose}
        />

        <RemoveQueueItemModal
          isOpen={isRemoveQueueItemModalOpen}
          sourceTitle={title}
          onRemovePress={this.onRemoveQueueItemModalConfirmed}
          onModalClose={this.onRemoveQueueItemModalClose}
        />
      </TableRow>
    );
  }

}

QueueRow.propTypes = {
  downloadId: PropTypes.string,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  trackedDownloadStatus: PropTypes.string,
  statusMessages: PropTypes.arrayOf(PropTypes.object),
  series: PropTypes.object.isRequired,
  episode: PropTypes.object.isRequired,
  quality: PropTypes.object.isRequired,
  protocol: PropTypes.string.isRequired,
  estimatedCompletionTime: PropTypes.string,
  timeleft: PropTypes.string,
  size: PropTypes.number,
  sizeleft: PropTypes.number,
  showRelativeDates: PropTypes.bool.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  grabbing: PropTypes.bool.isRequired,
  removing: PropTypes.bool.isRequired,
  onMonitorEpisodePress: PropTypes.func.isRequired,
  onGrabPress: PropTypes.func.isRequired,
  onRemoveQueueItemPress: PropTypes.func.isRequired
};

QueueRow.defaultProps = {
  grabbing: false,
  removing: false
};

export default QueueRow;
