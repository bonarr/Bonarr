import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import episodeEntities from 'Episode/episodeEntities';
import * as historyActions from 'Stores/Actions/historyActions';
import { fetchEpisodes, toggleEpisodeMonitored } from 'Stores/Actions/episodeActions';
import History from './History';

function createMapStateToProps() {
  return createSelector(
    (state) => state.history,
    (state) => state.episodes,
    (history, episodes) => {
      const result = _.pick(history, [
        'fetching',
        'populated',
        'error',
        'items',
        'page',
        'totalPages',
        'totalRecords',
        'sortKey',
        'sortDirection',
        'filterKey',
        'filterValue'
      ]);

      result.episodesFetching = episodes.fetching;
      result.episodesPopulated = episodes.populated;
      result.episodesError = episodes.error;

      return result;
    }
  );
}

const mapDispatchToProps = {
  ...historyActions,
  fetchEpisodes,
  toggleEpisodeMonitored
};

class HistoryConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchHistory();
  }

  componentWillReceiveProps(nextProps) {
    if (_.differenceBy(nextProps.items, this.props.items, ({ id }) => id).length) {
      const episodeIds = _.uniq(_.reduce(nextProps.items, (result, item) => {
        result.push(item.episodeId);

        return result;
      }, []));

      this.props.fetchEpisodes({ episodeIds });
    }
  }

  //
  // Listeners

  onFirstPagePress = () => {
    this.props.gotoHistoryFirstPage();
  }

  onPreviousPagePress = () => {
    this.props.gotoHistoryPreviousPage();
  }

  onNextPagePress = () => {
    this.props.gotoHistoryNextPage();
  }

  onLastPagePress = () => {
    this.props.gotoHistoryLastPage();
  }

  onPageSelect = (page) => {
    this.props.gotoHistoryPage({ page });
  }

  onSortPress = (sortKey) => {
    this.props.setHistorySort({ sortKey });
  }

  onFilterSelect = (filterKey, filterValue) => {
    this.props.setHistoryFilter({ filterKey, filterValue });
  }

  onMonitorEpisodePress = (episodeId, monitored) => {
    this.props.toggleEpisodeMonitored({
      episodeEntity: episodeEntities.EPISODES,
      episodeId,
      monitored
    });
  }

  //
  // Render

  render() {
    return (
      <History
        onFirstPagePress={this.onFirstPagePress}
        onPreviousPagePress={this.onPreviousPagePress}
        onNextPagePress={this.onNextPagePress}
        onLastPagePress={this.onLastPagePress}
        onPageSelect={this.onPageSelect}
        onSortPress={this.onSortPress}
        onFilterSelect={this.onFilterSelect}
        onMonitorEpisodePress={this.onMonitorEpisodePress}
        {...this.props}
      />
    );
  }
}

HistoryConnector.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchHistory: PropTypes.func.isRequired,
  gotoHistoryFirstPage: PropTypes.func.isRequired,
  gotoHistoryPreviousPage: PropTypes.func.isRequired,
  gotoHistoryNextPage: PropTypes.func.isRequired,
  gotoHistoryLastPage: PropTypes.func.isRequired,
  gotoHistoryPage: PropTypes.func.isRequired,
  setHistorySort: PropTypes.func.isRequired,
  setHistoryFilter: PropTypes.func.isRequired,
  fetchEpisodes: PropTypes.func.isRequired,
  toggleEpisodeMonitored: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(HistoryConnector);
