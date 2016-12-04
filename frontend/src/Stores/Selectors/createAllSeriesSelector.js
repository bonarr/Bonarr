import { createSelector } from 'reselect';

// TODO: Add series to the state tree
import SeriesCollection from 'Series/SeriesCollection';

function createAllSeriesSelector() {
  return createSelector(
    () => {
      return SeriesCollection.toJSON();
    }
  );
}

export default createAllSeriesSelector;
