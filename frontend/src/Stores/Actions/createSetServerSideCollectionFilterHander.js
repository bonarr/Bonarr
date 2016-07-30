import { setServerSideCollectionFilter } from './baseActions';

function createSetServerSideCollectionFilterHander(collection, page, getFromState, fetchHandler) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(setServerSideCollectionFilter({ collection, ...payload }));
      dispatch(fetchHandler());
    };
  };
}

export default createSetServerSideCollectionFilterHander;
