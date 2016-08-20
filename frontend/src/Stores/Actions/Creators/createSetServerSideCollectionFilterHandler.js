import { setServerSideCollectionFilter } from '../baseActions';

function createSetServerSideCollectionFilterHandler(section, getFromState, fetchHandler) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(setServerSideCollectionFilter({ section, ...payload }));
      dispatch(fetchHandler());
    };
  };
}

export default createSetServerSideCollectionFilterHandler;
