import React, { Component, PropTypes } from 'react';
import getProgressBarKind from 'Utilities/Series/getProgressBarKind';
import Icon from 'Components/Icon';
import IconButton from 'Components/IconButton';
import SpinnerIconButton from 'Components/SpinnerIconButton';
import ProgressBar from 'Components/ProgressBar';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import RelativeDateCellConnector from 'Components/Table/Cells/RelativeDateCellConnector';
import SeriesTitleLink from 'Series/SeriesTitleLink';
import EditSeriesModalConnector from 'Series/Edit/EditSeriesModalConnector';
import DeleteSeriesModal from 'Series/Delete/DeleteSeriesModal';
import styles from './SeriesIndexRow.css';

class SeriesIndexRow extends Component {

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
      network,
      qualityProfile,
      nextAiring,
      previousAiring,
      seasonCount,
      episodeCount,
      episodeFileCount,
      isRefreshingSeries,
      onRefreshSeriesPress
    } = this.props;

    const {
      isEditSeriesModalOpen,
      isDeleteSeriesModalOpen
    } = this.state;

    const progress = episodeCount ? episodeFileCount / episodeCount * 100 : 100;

    return (
      <TableRow>
        <TableRowCell className={styles.status}>
          <Icon
            className={styles.statusIcon}
            name={monitored ? 'icon-sonarr-monitored' : 'icon-sonarr-unmonitored'}
            title={monitored ? 'Series is monitored' : 'Series is unmonitored'}
          />

          <Icon
            className={styles.statusIcon}
            name={status === 'ended' ? 'icon-sonarr-series-ended' : 'icon-sonarr-series-continuing'}
            title={status === 'ended' ? 'Ended' : 'Continuing'}

          />
        </TableRowCell>

        <TableRowCell>
          <SeriesTitleLink
            titleSlug={titleSlug}
            title={title}
          />
        </TableRowCell>

        <TableRowCell>
          {network}
        </TableRowCell>

        <TableRowCell>
          {qualityProfile.name}
        </TableRowCell>

        <RelativeDateCellConnector
          date={nextAiring}

        />

        <RelativeDateCellConnector
          date={previousAiring}
        />

        <TableRowCell className={styles.seasonCount}>
          {seasonCount}
        </TableRowCell>

        <TableRowCell className={styles.episodeProgress}>
          <ProgressBar
            progress={progress}
            kind={getProgressBarKind(status, monitored, progress)}
            showText={true}
            text={`${episodeFileCount} / ${episodeCount}`}
            width={125}
          />
        </TableRowCell>

        <TableRowCell className={styles.actions}>
          <SpinnerIconButton
            name="icon-sonarr-refresh"
            title="Refresh series"
            isSpinning={isRefreshingSeries}
            onPress={onRefreshSeriesPress}
          />

          <IconButton
            name="icon-sonarr-edit"
            title="Edit Series"
            onPress={this.onEditSeriesPress}
          />
        </TableRowCell>

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
      </TableRow>
    );
  }
}

SeriesIndexRow.propTypes = {
  id: PropTypes.number.isRequired,
  monitored: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  titleSlug: PropTypes.string.isRequired,
  network: PropTypes.string.isRequired,
  qualityProfile: PropTypes.object.isRequired,
  nextAiring: PropTypes.string,
  previousAiring: PropTypes.string,
  seasonCount: PropTypes.number.isRequired,
  episodeCount: PropTypes.number,
  episodeFileCount: PropTypes.number,
  isRefreshingSeries: PropTypes.bool.isRequired,
  onRefreshSeriesPress: PropTypes.func.isRequired
};

SeriesIndexRow.defaultProps = {
  episodeCount: 0,
  episodeFileCount: 0
};

export default SeriesIndexRow;
