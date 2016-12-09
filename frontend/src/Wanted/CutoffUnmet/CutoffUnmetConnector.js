import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import episodeEntities from 'Episode/episodeEntities';
import createCommandsSelector from 'Stores/Selectors/createCommandsSelector';
import * as wantedActions from 'Stores/Actions/wantedActions';
import { toggleEpisodeMonitored } from 'Stores/Actions/episodeActions';
import { executeCommand } from 'Stores/Actions/commandActions';
import { fetchQueueDetails } from 'Stores/Actions/queueActions';
import commandNames from 'Commands/commandNames';
import CutoffUnmet from './CutoffUnmet';

function createMapStateToProps() {
  return createSelector(
    (state) => state.wanted.cutoffUnmet,
    createCommandsSelector(),
    (cutoffUnmet, commands) => {
      const isSearchingForEpisodes = _.some(commands, { name: commandNames.EPISODE_SEARCH });
      const isSearchingForCutoffUnmetEpisodes = _.some(commands, { name: commandNames.CUTOFF_UNMET_EPISODE_SEARCH });

      const result = _.pick(cutoffUnmet, [
        'fetching',
        'items',
        'page',
        'totalPages',
        'totalRecords',
        'sortKey',
        'sortDirection',
        'filterKey',
        'filterValue'
      ]);

      result.isSearchingForEpisodes = isSearchingForEpisodes;
      result.isSearchingForCutoffUnmetEpisodes = isSearchingForCutoffUnmetEpisodes;
      result.isSaving = _.some(result.items, { isSaving: true });

      return result;
    }
  );
}

const mapDispatchToProps = {
  ...wantedActions,
  toggleEpisodeMonitored,
  executeCommand,
  fetchQueueDetails
};

class CutoffUnmetConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchCutoffUnmet();
  }

  componentWillReceiveProps(nextProps) {
    if (_.differenceBy(nextProps.items, this.props.items, ({ id }) => id).length) {
      const episodeIds = _.uniq(_.reduce(nextProps.items, (result, item) => {
        const id = item.id;

        if (id && id > 0) {
          result.push(id);
        }

        return result;
      }, []));

      this.props.fetchQueueDetails({ episodeIds });
    }
  }

  //
  // Listeners

  onFirstPagePress = () => {
    this.props.gotoCutoffUnmetFirstPage();
  }

  onPreviousPagePress = () => {
    this.props.gotoCutoffUnmetPreviousPage();
  }

  onNextPagePress = () => {
    this.props.gotoCutoffUnmetNextPage();
  }

  onLastPagePress = () => {
    this.props.gotoCutoffUnmetLastPage();
  }

  onPageSelect = (page) => {
    this.props.gotoCutoffUnmetPage({ page });
  }

  onSortPress = (sortKey) => {
    this.props.setCutoffUnmetSort({ sortKey });
  }

  onFilterSelect = (filterKey, filterValue) => {
    this.props.setCutoffUnmetFilter({ filterKey, filterValue });
  }

  onSearchSelectedPress = (selected) => {
    this.props.executeCommand({
      name: commandNames.EPISODE_SEARCH,
      episodeIds: selected
    });
  }

  onUnmonitorSelectedPress = (selected) => {
    this.props.batchUnmonitorCutoffUnmetEpisodes({
      episodeIds: selected,
      monitored: false
    });
  }

  onSearchAllCutoffUnmetPress = () => {
    this.props.executeCommand({
      name: commandNames.CUTOFF_UNMET_EPISODE_SEARCH
    });
  }

  onMonitorEpisodePress = (episodeId, monitored) => {
    this.props.toggleEpisodeMonitored({
      episodeEntity: episodeEntities.WANTED_CUTOFF_UNMET,
      episodeId,
      monitored
    });
  }

  //
  // Render

  render() {
    return (
      <CutoffUnmet
        onFirstPagePress={this.onFirstPagePress}
        onPreviousPagePress={this.onPreviousPagePress}
        onNextPagePress={this.onNextPagePress}
        onLastPagePress={this.onLastPagePress}
        onPageSelect={this.onPageSelect}
        onSortPress={this.onSortPress}
        onFilterSelect={this.onFilterSelect}
        onSearchSelectedPress={this.onSearchSelectedPress}
        onUnmonitorSelectedPress={this.onUnmonitorSelectedPress}
        onSearchAllCutoffUnmetPress={this.onSearchAllCutoffUnmetPress}
        onMonitorEpisodePress={this.onMonitorEpisodePress}
        {...this.props}
      />
    );
  }
}

CutoffUnmetConnector.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchCutoffUnmet: PropTypes.func.isRequired,
  gotoCutoffUnmetFirstPage: PropTypes.func.isRequired,
  gotoCutoffUnmetPreviousPage: PropTypes.func.isRequired,
  gotoCutoffUnmetNextPage: PropTypes.func.isRequired,
  gotoCutoffUnmetLastPage: PropTypes.func.isRequired,
  gotoCutoffUnmetPage: PropTypes.func.isRequired,
  setCutoffUnmetSort: PropTypes.func.isRequired,
  setCutoffUnmetFilter: PropTypes.func.isRequired,
  toggleEpisodeMonitored: PropTypes.func.isRequired,
  batchUnmonitorCutoffUnmetEpisodes: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired,
  fetchQueueDetails: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(CutoffUnmetConnector);
