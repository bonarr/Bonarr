import sortDirections from 'Utilities/sortDirections';
import { setServerSideCollectionSort } from '../baseActions';

function createSetServerSideCollectionSortHandler(collection, getFromState, fetchHandler) {
  return function(payload) {
    return function(dispatch, getState) {
      const state = getFromState(getState())[collection];
      const sortKey = payload.sortKey || state.sortKey;
      let sortDirection = payload.sortDirection;

      if (!sortDirection) {
        if (payload.sortKey === state.sortKey) {
          sortDirection = state.sortDirection === sortDirections.ASCENDING ?
                          sortDirections.DESCENDING :
                          sortDirections.ASCENDING;
        } else {
          sortDirection = state.sortDirection;
        }
      }

      dispatch(setServerSideCollectionSort({ collection, sortKey, sortDirection }));
      dispatch(fetchHandler());
    };
  };
}

export default createSetServerSideCollectionSortHandler;
