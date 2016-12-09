import React, { Component, PropTypes } from 'react';
import episodeEntities from 'Episode/episodeEntities';
import EpisodeTitleLink from 'Episode/EpisodeTitleLink';
import EpisodeStatusConnector from 'Episode/EpisodeStatusConnector';
import SeasonEpisodeNumber from 'Episode/SeasonEpisodeNumber';
import SeriesTitleLink from 'Series/SeriesTitleLink';
import RelativeDateCellConnector from 'Components/Table/Cells/RelativeDateCellConnector';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import TableSelectCell from 'Components/Table/Cells/TableSelectCell';

class MissingRow extends Component {

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
      <TableRow>
        <TableSelectCell
          id={id}
          isSelected={isSelected}
          onSelectedChange={onSelectedChange}
        />

        <TableRowCell>
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
            episodeEntity={episodeEntities.WANTED_MISSING}
            episodeTitle={title}
            showOpenSeriesButton={true}
            onMonitorEpisodePress={onMonitorEpisodePress}
          />
        </TableRowCell>

        <RelativeDateCellConnector
          date={airDateUtc}
        />

        <TableRowCell>
          <EpisodeStatusConnector
            episodeId={id}
            episodeFileId={episodeFileId}
            episodeEntity={episodeEntities.WANTED_MISSING}
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
