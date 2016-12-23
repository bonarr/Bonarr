import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createAllSeriesSelector from 'Stores/Selectors/createAllSeriesSelector';
import AddNewSeriesSearchResult from './AddNewSeriesSearchResult';

function createMapStateToProps() {
  return createSelector(
    (state, { tvdbId }) => tvdbId,
    createAllSeriesSelector(),
    (tvdbId, series) => {
      const isExistingSeries = _.some(series, { tvdbId });

      return {
        isExistingSeries
      };
    }
  );
}

function AddNewSeriesSearchResultConnector(props) {
  return (
    <AddNewSeriesSearchResult
      {...props}
    />
  );
}

AddNewSeriesSearchResultConnector.propTypes = {
  tvdbId: PropTypes.number.isRequired
};

export default connect(createMapStateToProps)(AddNewSeriesSearchResultConnector);
