import { set } from '../baseActions';

function createSetServerSideCollectionFilterHandler(section, getFromState, fetchHandler) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(set({ section, ...payload }));
      dispatch(fetchHandler());
    };
  };
}

export default createSetServerSideCollectionFilterHandler;
