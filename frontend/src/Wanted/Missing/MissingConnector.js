import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createCommandsSelector from 'Stores/Selectors/createCommandsSelector';
import * as wantedActions from 'Stores/Actions/wantedActions';
import { executeCommand } from 'Stores/Actions/commandActions';
import { fetchQueueDetails } from 'Stores/Actions/queueActions';
import Missing from './Missing';

const episodeSearchCommandName = 'EpisodeSearch';
const missingEpisodeSearchCommandName = 'MissingEpisodeSearch';

function createMapStateToProps() {
  return createSelector(
    (state) => state.wanted.missing,
    createCommandsSelector(),
    (missing, commands) => {
      const isSearchingForEpisodes = _.some(commands, { name: episodeSearchCommandName });
      const isSearchingForMissingEpisodes = _.some(commands, { name: missingEpisodeSearchCommandName });

      const result = _.pick(missing, [
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
      result.isSearchingForMissingEpisodes = isSearchingForMissingEpisodes;

      return result;
    }
  );
}

const mapDispatchToProps = {
  ...wantedActions,
  executeCommand,
  fetchQueueDetails
};

class MissingConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchMissing();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
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
    this.props.gotoMissingFirstPage();
  }

  onPreviousPagePress = () => {
    this.props.gotoMissingPreviousPage();
  }

  onNextPagePress = () => {
    this.props.gotoMissingNextPage();
  }

  onLastPagePress = () => {
    this.props.gotoMissingLastPage();
  }

  onPageSelect = (page) => {
    this.props.gotoMissingPage({ page });
  }

  onSortPress = (sortKey) => {
    this.props.setMissingSort({ sortKey });
  }

  onFilterSelect = (filterKey, filterValue) => {
    this.props.setMissingFilter({ filterKey, filterValue });
  }

  onSearchSelectedPress = (selected) => {
    this.props.executeCommand({
      name: episodeSearchCommandName,
      episodeIds: selected
    });
  }

  onUnmonitorSelectedPress = (selected) => {

  }

  onSearchAllMissingPress = () => {
    this.props.executeCommand({
      name: missingEpisodeSearchCommandName
    });
  }

  onRescanDroneFactoryPress = () => {

  }

  onManualImportPress = () => {

  }

  //
  // Render

  render() {
    return (
      <Missing
        onFirstPagePress={this.onFirstPagePress}
        onPreviousPagePress={this.onPreviousPagePress}
        onNextPagePress={this.onNextPagePress}
        onLastPagePress={this.onLastPagePress}
        onPageSelect={this.onPageSelect}
        onSortPress={this.onSortPress}
        onFilterSelect={this.onFilterSelect}
        onSearchSelectedPress={this.onSearchSelectedPress}
        onUnmonitorSelectedPress={this.onUnmonitorSelectedPress}
        onSearchAllMissingPress={this.onSearchAllMissingPress}
        onRescanDroneFactoryPress={this.onRescanDroneFactoryPress}
        onManualImportPress={this.onManualImportPress}
        {...this.props}
      />
    );
  }
}

MissingConnector.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchMissing: PropTypes.func.isRequired,
  gotoMissingFirstPage: PropTypes.func.isRequired,
  gotoMissingPreviousPage: PropTypes.func.isRequired,
  gotoMissingNextPage: PropTypes.func.isRequired,
  gotoMissingLastPage: PropTypes.func.isRequired,
  gotoMissingPage: PropTypes.func.isRequired,
  setMissingSort: PropTypes.func.isRequired,
  setMissingFilter: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired,
  fetchQueueDetails: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(MissingConnector);
