import _ from 'lodash';
import { createSelector } from 'reselect';

function createSeriesSelector() {
  return createSelector(
    (state, { seriesId }) => seriesId,
    (state) => state.series,
    (seriesId, series) => {
      return _.find(series.items, { id: seriesId });
    }
  );
}

export default createSeriesSelector;
