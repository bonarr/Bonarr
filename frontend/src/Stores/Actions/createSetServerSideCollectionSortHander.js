import { setServerSideCollectionSort } from './baseActions';

function createSetServerSideCollectionSortHander(collection, page, getFromState, fetchHandler) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(setServerSideCollectionSort({ collection, ...payload }));
      dispatch(fetchHandler());
    };
  };
}

export default createSetServerSideCollectionSortHander;
