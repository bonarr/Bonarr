import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import connectSection from 'Stores/connectSection';
import { fetchEpisodes, setEpisodesSort, clearEpisodes } from 'Stores/Actions/episodeActions';
import { updateManualImportItem } from 'Stores/Actions/manualImportActions';
import createClientSideCollectionSelector from 'Stores/Selectors/createClientSideCollectionSelector';
import SelectEpisodeModalContent from './SelectEpisodeModalContent';

function createMapStateToProps() {
  return createSelector(
    createClientSideCollectionSelector(),
    (episodes) => {
      return episodes;
    }
  );
}

const mapDispatchToProps = {
  fetchEpisodes,
  setEpisodesSort,
  clearEpisodes,
  updateManualImportItem
};

class SelectEpisodeModalContentConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    const {
      seriesId,
      seasonNumber
    } = this.props;

    this.props.fetchEpisodes({ seriesId, seasonNumber });
  }

  componentWillUnmount() {
    this.props.clearEpisodes();
  }

  //
  // Listeners

  onSortPress = (sortKey, sortDirection) => {
    this.props.setEpisodesSort({ sortKey, sortDirection });
  }

  onEpisodesSelect = (episodeIds) => {
    const episodes = _.reduce(this.props.items, (acc, item) => {
      if (episodeIds.indexOf(item.id) > -1) {
        acc.push(item);
      }

      return acc;
    }, []);

    this.props.updateManualImportItem({
      id: this.props.id,
      episodes: _.sortBy(episodes, 'episodeNumber')
    });

    this.props.onModalClose(true);
  }

  //
  // Render

  render() {
    return (
      <SelectEpisodeModalContent
        {...this.props}
        onSortPress={this.onSortPress}
        onEpisodesSelect={this.onEpisodesSelect}
      />
    );
  }
}

SelectEpisodeModalContentConnector.propTypes = {
  id: PropTypes.number.isRequired,
  seriesId: PropTypes.number.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchEpisodes: PropTypes.func.isRequired,
  setEpisodesSort: PropTypes.func.isRequired,
  clearEpisodes: PropTypes.func.isRequired,
  updateManualImportItem: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connectSection(
                createMapStateToProps,
                mapDispatchToProps,
                undefined,
                undefined,
                { section: 'episodes' }
               )(SelectEpisodeModalContentConnector);
