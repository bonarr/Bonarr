import React, { Component, PropTypes } from 'react';
import EpisodeQuality from 'Episode/EpisodeQuality';
import SeriesTitleLink from 'Series/SeriesTitleLink';
import IconButton from 'Components/IconButton';
import RelativeDateCellConnector from 'Components/Table/Cells/RelativeDateCellConnector';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import BlacklistDetailsModal from './BlacklistDetailsModal';
import styles from './BlacklistRow.css';

class BlacklistRow extends Component {

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

  onDetailsPress = () => {
    this.setState({ isDetailsModalOpen: true });
  }

  onDetailsModalClose = () => {
    this.setState({ isDetailsModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      id,
      series,
      sourceTitle,
      quality,
      date,
      protocol,
      indexer,
      message
    } = this.props;

    return (
      <TableRow>
        <TableRowCell>
          <SeriesTitleLink
            titleSlug={series.titleSlug}
            title={series.title}
          />
        </TableRowCell>

        <TableRowCell>
          {sourceTitle}
        </TableRowCell>

        <TableRowCell className={styles.quality}>
          <EpisodeQuality
            quality={quality}
          />
        </TableRowCell>

        <RelativeDateCellConnector
          date={date}
        />

        <TableRowCell className={styles.details}>
          <IconButton
            name="icon-sonarr-details"
            onPress={this.onDetailsPress}
          />
        </TableRowCell>

        <BlacklistDetailsModal
          isOpen={this.state.isDetailsModalOpen}
          sourceTitle={sourceTitle}
          protocol={protocol}
          indexer={indexer}
          message={message}
          onModalClose={this.onDetailsModalClose}
        />
      </TableRow>
    );
  }

}

BlacklistRow.propTypes = {
  id: PropTypes.number.isRequired,
  series: PropTypes.object.isRequired,
  sourceTitle: PropTypes.string.isRequired,
  quality: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  protocol: PropTypes.string.isRequired,
  indexer: PropTypes.string,
  message: PropTypes.string
};

export default BlacklistRow;
