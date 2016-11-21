import React, { Component, PropTypes } from 'react';
import longDateTime from 'Utilities/Date/longDateTime';
import relativeDate from 'Utilities/Date/relativeDate';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/TableRowCell';
import TableSelectCell from 'Components/Table/TableSelectCell';
import EpisodeTitleLink from 'Episode/EpisodeTitleLink';
import styles from './MissingRow.css';
import EpisodeStatusConnector from 'Episode/EpisodeStatusConnector';
import SeasonEpisodeNumber from 'Episode/SeasonEpisodeNumber';
import SeriesTitleLink from 'Series/SeriesTitleLink';
class MissingRow extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isDetailsModalOpen: false
    };
  }

  //
  // Listeners

  onClick = () => {
    this.setState({ isDetailsModalOpen: true });
  }

  onModalClose = () => {
    this.setState({ isDetailsModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      id,
      episodeFileId,
      series,
      seasonNumber,
      episodeNumber,
      absoluteEpisodeNumber,
      sceneSeasonNumber,
      sceneEpisodeNumber,
      sceneAbsoluteEpisodeNumber,
      airDateUtc,
      title,
      isSelected,
      onSelectedChange,
      onMonitorEpisodePress
    } = this.props;

    return (
      <TableRow
        className={styles.row}
      >
        <TableSelectCell
          id={id}
          isSelected={isSelected}
          onSelectedChange={onSelectedChange}
        />

        <TableRowCell
          className={styles.seriesTitle}
        >
          <SeriesTitleLink
            titleSlug={series.titleSlug}
            title={series.title}
          />
        </TableRowCell>

        <TableRowCell>
          <SeasonEpisodeNumber
            seasonNumber={seasonNumber}
            episodeNumber={episodeNumber}
            absoluteEpisodeNumber={absoluteEpisodeNumber}
            seriesType={series.seriesType}
            sceneSeasonNumber={sceneSeasonNumber}
            sceneEpisodeNumber={sceneEpisodeNumber}
            sceneAbsoluteEpisodeNumber={sceneAbsoluteEpisodeNumber}
          />
        </TableRowCell>

        <TableRowCell>
          <EpisodeTitleLink
            episodeId={id}
            seriesId={series.id}
            episodeEntity="wanted.missing"
            episodeTitle={title}
            showOpenSeriesButton={true}
            onMonitorEpisodePress={onMonitorEpisodePress}
          />
        </TableRowCell>

        <TableRowCell
          className={styles.airDate}
          title={longDateTime(airDateUtc)}
        >
          {relativeDate(airDateUtc)}
        </TableRowCell>

        <TableRowCell>
          <EpisodeStatusConnector
            episodeId={id}
            episodeFileId={episodeFileId}
            episodeEntity="wanted.missing"
          />
        </TableRowCell>
      </TableRow>
    );
  }

}

MissingRow.propTypes = {
  id: PropTypes.number.isRequired,
  episodeFileId: PropTypes.number,
  series: PropTypes.object.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  episodeNumber: PropTypes.number.isRequired,
  absoluteEpisodeNumber: PropTypes.number,
  sceneSeasonNumber: PropTypes.number,
  sceneEpisodeNumber: PropTypes.number,
  sceneAbsoluteEpisodeNumber: PropTypes.number,
  airDateUtc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onSelectedChange: PropTypes.func.isRequired,
  onMonitorEpisodePress: PropTypes.func.isRequired
};

export default MissingRow;
