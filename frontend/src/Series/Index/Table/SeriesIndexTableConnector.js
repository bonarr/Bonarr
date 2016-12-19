import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import connectSection from 'Stores/connectSection';
import createClientSideCollectionSelector from 'Stores/Selectors/createClientSideCollectionSelector';
import { setSeriesSort } from 'Stores/Actions/seriesIndexActions';
import SeriesIndexTable from './SeriesIndexTable';

function createMapStateToProps() {
  return createSelector(
    createClientSideCollectionSelector(),
    (series) => {
      return {
        ...series
      };
    }
  );
}

const mapDispatchToProps = {
  setSeriesSort
};

class SeriesIndexTableConnector extends Component {

  //
  // Listeners

  onSortPress = (sortKey) => {
    this.props.setSeriesSort({ sortKey });
  }

  //
  // Render

  render() {
    return (
      <SeriesIndexTable
        {...this.props}
        onSortPress={this.onSortPress}
      />
    );
  }
}

SeriesIndexTableConnector.propTypes = {
  setSeriesSort: PropTypes.func.isRequired
};

export default connectSection(
                createMapStateToProps,
                mapDispatchToProps,
                undefined,
                undefined,
                { section: 'series', uiSection: 'seriesIndex' }
              )(SeriesIndexTableConnector);
