import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createCommandsSelector from 'Stores/Selectors/createCommandsSelector';
import * as blacklistActions from 'Stores/Actions/blacklistActions';
import { executeCommand } from 'Stores/Actions/commandActions';
import commandNames from 'Commands/commandNames';
import Blacklist from './Blacklist';

function createMapStateToProps() {
  return createSelector(
    (state) => state.blacklist,
    createCommandsSelector(),
    (blacklist, commands) => {
      const isClearingBlacklistExecuting = _.some(commands, { name: commandNames.CLEAR_BLACKLIST });

      const result = _.pick(blacklist, [
        'fetching',
        'items',
        'page',
        'totalPages',
        'totalRecords',
        'sortKey',
        'sortDirection'
      ]);

      result.isClearingBlacklistExecuting = isClearingBlacklistExecuting;

      return result;
    }
  );
}

const mapDispatchToProps = {
  ...blacklistActions,
  executeCommand
};

class BlacklistConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchBlacklist();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isClearingBlacklistExecuting && this.props.isClearingBlacklistExecuting) {
      this.props.gotoBlacklistFirstPage();
    }
  }

  //
  // Listeners

  onFirstPagePress = () => {
    this.props.gotoBlacklistFirstPage();
  }

  onPreviousPagePress = () => {
    this.props.gotoBlacklistPreviousPage();
  }

  onNextPagePress = () => {
    this.props.gotoBlacklistNextPage();
  }

  onLastPagePress = () => {
    this.props.gotoBlacklistLastPage();
  }

  onPageSelect = (page) => {
    this.props.gotoBlacklistPage({ page });
  }

  onSortPress = (sortKey) => {
    this.props.setBlacklistSort({ sortKey });
  }

  onClearBlacklistPress = () => {
    this.props.executeCommand({ name: commandNames.CLEAR_BLACKLIST });
  }

  //
  // Render

  render() {
    return (
      <Blacklist
        onFirstPagePress={this.onFirstPagePress}
        onPreviousPagePress={this.onPreviousPagePress}
        onNextPagePress={this.onNextPagePress}
        onLastPagePress={this.onLastPagePress}
        onPageSelect={this.onPageSelect}
        onSortPress={this.onSortPress}
        onClearBlacklistPress={this.onClearBlacklistPress}
        {...this.props}
      />
    );
  }
}

BlacklistConnector.propTypes = {
  isClearingBlacklistExecuting: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchBlacklist: PropTypes.func.isRequired,
  gotoBlacklistFirstPage: PropTypes.func.isRequired,
  gotoBlacklistPreviousPage: PropTypes.func.isRequired,
  gotoBlacklistNextPage: PropTypes.func.isRequired,
  gotoBlacklistLastPage: PropTypes.func.isRequired,
  gotoBlacklistPage: PropTypes.func.isRequired,
  setBlacklistSort: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(BlacklistConnector);
