import { setServerSideCollectionFilter } from '../baseActions';

function createSetServerSideCollectionFilterHandler(collection, getFromState, fetchHandler) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(setServerSideCollectionFilter({ collection, ...payload }));
      dispatch(fetchHandler());
    };
  };
}

export default createSetServerSideCollectionFilterHandler;
