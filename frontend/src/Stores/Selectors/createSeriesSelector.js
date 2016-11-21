import { createSelector } from 'reselect';

// TODO: Add series to the state tree
import SeriesCollection from 'Series/SeriesCollection';

function createSeriesSelector() {
  return createSelector(
    (state, { seriesId }) => seriesId,
    (seriesId) => {
      return SeriesCollection.get(seriesId).toJSON();
    }
  );
}

export default createSeriesSelector;
