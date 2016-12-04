import React, { Component, PropTypes } from 'react';
import formatBytes from 'Utilities/Number/formatBytes';
import { tooltipPositions } from 'Helpers/Props';
import Icon from 'Components/Icon';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import TableRowCellButton from 'Components/Table/Cells/TableRowCellButton';
import TableSelectCell from 'Components/Table/Cells/TableSelectCell';
import Popover from 'Components/Tooltip/Popover';
import EpisodeQuality from 'Episode/EpisodeQuality';
import SelectSeriesModal from 'ManualImport/Series/SelectSeriesModal';
import SelectSeasonModal from 'ManualImport/Season/SelectSeasonModal';
import SelectEpisodeModal from 'ManualImport/Episode/SelectEpisodeModal';
import SelectQualityModal from 'ManualImport/Quality/SelectQualityModal';
import InteractiveImportRowCellPlaceholder from './InteractiveImportRowCellPlaceholder';
import styles from './InteractiveImportRow.css';

class InteractiveImportRow extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isSelectSeriesModalOpen: false,
      isSelectSeasonModalOpen: false,
      isSelectEpisodeModalOpen: false,
      isSelectQualityModalOpen: false
    };
  }

  //
  // Control

  selectRowAfterChange = (value) => {
    const {
      id,
      isSelected
    } = this.props;

    if (!isSelected && value === true) {
      this.props.onSelectedChange({ id, value });
    }
  }

  //
  // Listeners

  onSelectSeriesPress = () => {
    this.setState({ isSelectSeriesModalOpen: true });
  }

  onSelectSeasonPress = () => {
    this.setState({ isSelectSeasonModalOpen: true });
  }

  onSelectEpisodePress = () => {
    this.setState({ isSelectEpisodeModalOpen: true });
  }

  onSelectQualityPress = () => {
    this.setState({ isSelectQualityModalOpen: true });
  }

  onSelectSeriesModalClose = (changed) => {
    this.setState({ isSelectSeriesModalOpen: false });
    this.selectRowAfterChange(changed);
  }

  onSelectSeasonModalClose = (changed) => {
    this.setState({ isSelectSeasonModalOpen: false });
    this.selectRowAfterChange(changed);
  }

  onSelectEpisodeModalClose = (changed) => {
    this.setState({ isSelectEpisodeModalOpen: false });
    this.selectRowAfterChange(changed);
  }

  onSelectQualityModalClose = (changed) => {
    this.setState({ isSelectQualityModalOpen: false });
    this.selectRowAfterChange(changed);
  }

  //
  // Render

  render() {
    const {
      id,
      relativePath,
      series,
      seasonNumber,
      episodes,
      quality,
      size,
      rejections,
      isSelected,
      onSelectedChange
    } = this.props;

    const {
      isSelectSeriesModalOpen,
      isSelectSeasonModalOpen,
      isSelectEpisodeModalOpen,
      isSelectQualityModalOpen
    } = this.state;

    const seriesTitle = series ? series.title : '';
    const episodeNumbers = episodes.map((episode) => episode.episodeNumber)
                                   .join(', ');

    const showSeriesPlaceholder = isSelected && !series;
    const showSeasonNumberPlaceholder = isSelected && !!series && isNaN(seasonNumber);
    const showEpisodeNumbersPlaceholder = isSelected && Number.isInteger(seasonNumber) && !episodes.length;

    return (
      <TableRow>
        <TableSelectCell
          id={id}
          isSelected={isSelected}
          onSelectedChange={onSelectedChange}
        />

        <TableRowCell>
          {relativePath}
        </TableRowCell>

        <TableRowCellButton
          onPress={this.onSelectSeriesPress}
        >
          {
            showSeriesPlaceholder ? <InteractiveImportRowCellPlaceholder /> : seriesTitle
          }
        </TableRowCellButton>

        <TableRowCellButton
          isDisabled={!series}
          onPress={this.onSelectSeasonPress}
        >
          {
            showSeasonNumberPlaceholder ? <InteractiveImportRowCellPlaceholder /> : seasonNumber
          }
        </TableRowCellButton>

        <TableRowCellButton
          isDisabled={!series || isNaN(seasonNumber)}
          onPress={this.onSelectEpisodePress}
        >
          {
            showEpisodeNumbersPlaceholder ? <InteractiveImportRowCellPlaceholder /> : episodeNumbers
          }
        </TableRowCellButton>

        <TableRowCellButton
          className={styles.quality}
          onPress={this.onSelectQualityPress}
        >
          <EpisodeQuality
            quality={quality}
          />
        </TableRowCellButton>

        <TableRowCell>
          {formatBytes(size)}
        </TableRowCell>

        <TableRowCell>
          {
            !!rejections.length &&
              <Popover
                anchor={
                  <Icon
                    name="icon-sonarr-form-danger"
                  />
                }
                title="Release Rejected"
                body={
                  <ul>
                    {
                      rejections.map((rejection, index) => {
                        return (
                          <li key={index}>
                            {rejection.reason}
                          </li>
                        );
                      })
                    }
                  </ul>
                }
                position={tooltipPositions.LEFT}
              />
          }
        </TableRowCell>

        <SelectSeriesModal
          isOpen={isSelectSeriesModalOpen}
          id={id}
          onModalClose={this.onSelectSeriesModalClose}
        />

        <SelectSeasonModal
          isOpen={isSelectSeasonModalOpen}
          id={id}
          seriesId={series && series.id}
          onModalClose={this.onSelectSeasonModalClose}
        />

        <SelectEpisodeModal
          isOpen={isSelectEpisodeModalOpen}
          id={id}
          seriesId={series && series.id}
          seasonNumber={seasonNumber}
          onModalClose={this.onSelectEpisodeModalClose}
        />

        <SelectQualityModal
          isOpen={isSelectQualityModalOpen}
          id={id}
          qualityId={quality.quality.id}
          proper={quality.revision.version > 1}
          real={quality.revision.real > 0}
          onModalClose={this.onSelectQualityModalClose}
        />
      </TableRow>
    );
  }

}

InteractiveImportRow.propTypes = {
  id: PropTypes.number.isRequired,
  relativePath: PropTypes.string.isRequired,
  series: PropTypes.object,
  seasonNumber: PropTypes.number,
  episodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  quality: PropTypes.object,
  size: PropTypes.number.isRequired,
  rejections: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSelected: PropTypes.bool,
  onSelectedChange: PropTypes.func.isRequired
};

InteractiveImportRow.defaultProps = {
  episodes: []
};

export default InteractiveImportRow;
