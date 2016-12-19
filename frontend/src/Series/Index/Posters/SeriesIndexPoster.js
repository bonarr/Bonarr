import React, { Component, PropTypes } from 'react';
import getRelativeDate from 'Utilities/Date/getRelativeDate';
import getProgressBarKind from 'Utilities/Series/getProgressBarKind';
import { kinds } from 'Helpers/Props';
import IconButton from 'Components/IconButton';
import SpinnerIconButton from 'Components/SpinnerIconButton';
import Label from 'Components/Label';
import Link from 'Components/Link';
import ProgressBar from 'Components/ProgressBar';
import SeriesPoster from 'Series/SeriesPoster';
import EditSeriesModalConnector from 'Series/Edit/EditSeriesModalConnector';
import DeleteSeriesModal from 'Series/Delete/DeleteSeriesModal';
import styles from './SeriesIndexPoster.css';

class SeriesIndexPoster extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isEditSeriesModalOpen: false,
      isDeleteSeriesModalOpen: false
    };
  }

  onEditSeriesPress = () => {
    this.setState({ isEditSeriesModalOpen: true });
  }

  onEditSeriesModalClose = () => {
    this.setState({ isEditSeriesModalOpen: false });
  }

  onDeleteSeriesPress = () => {
    this.setState({
      isEditSeriesModalOpen: false,
      isDeleteSeriesModalOpen: true
    });
  }

  onDeleteSeriesModalClose = () => {
    this.setState({ isDeleteSeriesModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      id,
      monitored,
      status,
      title,
      titleSlug,
      nextAiring,
      episodeCount,
      episodeFileCount,
      images,
      showRelativeDates,
      shortDateFormat,
      timeFormat,
      isRefreshingSeries,
      onRefreshSeriesPress
    } = this.props;

    const {
      isEditSeriesModalOpen,
      isDeleteSeriesModalOpen
    } = this.state;

    const link = `/series/${titleSlug}`;
    const progress = episodeCount ? episodeFileCount / episodeCount * 100 : 100;

    return (
      <div className={styles.container}>
        <Label className={styles.controls}>
          <SpinnerIconButton
            className={styles.action}
            name="icon-sonarr-refresh"
            title="Refresh series"
            isSpinning={isRefreshingSeries}
            onPress={onRefreshSeriesPress}
          />

          <IconButton
            className={styles.action}
            name="icon-sonarr-edit"
            title="Edit Series"
            onPress={this.onEditSeriesPress}
          />
        </Label>

        {
          status === 'ended' &&
            <Label
              className={styles.ended}
              kind={kinds.DANGER}
            >
              Ended
            </Label>
        }

        <div className={styles.title}>
          {title}
        </div>

        <Link to={link}>
          <SeriesPoster
            className={styles.poster}
            images={images}
            size={250}
            lazy={true}
          />
        </Link>

        <ProgressBar
          className={styles.progressBar}
          containerClassName={styles.progress}
          progress={progress}
          kind={getProgressBarKind(status, monitored, progress)}
          showText={true}
          text={`${episodeFileCount} / ${episodeCount}`}
          width={161.9}
        />

        <div className={styles.nextAiring}>
          {
            getRelativeDate(
              nextAiring,
              shortDateFormat,
              showRelativeDates,
              {
                timeFormat,
                timeForToday: true
              })
          }
        </div>

        <EditSeriesModalConnector
          isOpen={isEditSeriesModalOpen}
          seriesId={id}
          onModalClose={this.onEditSeriesModalClose}
          onDeleteSeriesPress={this.onDeleteSeriesPress}
        />

        <DeleteSeriesModal
          isOpen={isDeleteSeriesModalOpen}
          seriesId={id}
          onModalClose={this.onDeleteSeriesModalClose}
        />
      </div>
    );
  }
}

SeriesIndexPoster.propTypes = {
  id: PropTypes.number.isRequired,
  monitored: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  titleSlug: PropTypes.string.isRequired,
  nextAiring: PropTypes.string,
  episodeCount: PropTypes.number,
  episodeFileCount: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  showRelativeDates: PropTypes.bool.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  isRefreshingSeries: PropTypes.bool.isRequired,
  onRefreshSeriesPress: PropTypes.func.isRequired
};

SeriesIndexPoster.defaultProps = {
  episodeCount: 0,
  episodeFileCount: 0
};

export default SeriesIndexPoster;
