import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as queueActions from 'Stores/Actions/queueActions';
import Queue from './Queue';

function createMapStateToProps() {
  return createSelector(
    (state) => state.queue.paged,
    (queued, commands) => {
      return _.pick(queued, [
        'fetching',
        'items',
        'page',
        'totalPages',
        'totalRecords',
        'sortKey',
        'sortDirection'
      ]);
    }
  );
}

const mapDispatchToProps = {
  ...queueActions
};

class QueueConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchQueue();
  }

  componentWillReceiveProps(nextProps) {
    if (_.differenceBy(nextProps.items, this.props.items, ({ id }) => id).length) {
      const episodes = _.uniqBy(_.reduce(nextProps.items, (result, item) => {
        result.push(item.episode);

        return result;
      }, []), ({ id }) => id);

      this.props.setQueueEpisodes({ episodes });
    }
  }

  //
  // Listeners

  onFirstPagePress = () => {
    this.props.gotoQueueFirstPage();
  }

  onPreviousPagePress = () => {
    this.props.gotoQueuePreviousPage();
  }

  onNextPagePress = () => {
    this.props.gotoQueueNextPage();
  }

  onLastPagePress = () => {
    this.props.gotoQueueLastPage();
  }

  onPageSelect = (page) => {
    this.props.gotoQueuePage({ page });
  }

  onSortPress = (sortKey) => {
    this.props.setQueueSort({ sortKey });
  }

  onRefreshPress = () => {
    this.props.gotoQueueFirstPage();
  }

  //
  // Render

  render() {
    return (
      <Queue
        onFirstPagePress={this.onFirstPagePress}
        onPreviousPagePress={this.onPreviousPagePress}
        onNextPagePress={this.onNextPagePress}
        onLastPagePress={this.onLastPagePress}
        onPageSelect={this.onPageSelect}
        onSortPress={this.onSortPress}
        onRefreshPress={this.onRefreshPress}
        {...this.props}
      />
    );
  }
}

QueueConnector.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchQueue: PropTypes.func.isRequired,
  gotoQueueFirstPage: PropTypes.func.isRequired,
  gotoQueuePreviousPage: PropTypes.func.isRequired,
  gotoQueueNextPage: PropTypes.func.isRequired,
  gotoQueueLastPage: PropTypes.func.isRequired,
  gotoQueuePage: PropTypes.func.isRequired,
  setQueueSort: PropTypes.func.isRequired,
  setQueueEpisodes: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(QueueConnector);
