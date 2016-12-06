import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createSeriesSelector from 'Stores/Selectors/createSeriesSelector';
import BlacklistRow from './BlacklistRow';

function createMapStateToProps() {
  return createSelector(
    createSeriesSelector(),
    (series) => {
      return {
        series
      };
    }
  );
}

export default connect(createMapStateToProps)(BlacklistRow);
