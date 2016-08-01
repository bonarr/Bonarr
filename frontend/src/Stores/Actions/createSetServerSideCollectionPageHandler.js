import { setServerSideCollectionPage } from './baseActions';
import pages from 'Utilities/pages';

function createSetServerSideCollectionPageHandler(collection, page, getFromState, fetchHandler) {
  return function(payload) {
    return function(dispatch, getState) {
      const collectionState = getFromState(getState())[collection];
      const currentPage = collectionState.page || 1;
      let nextPage = 0;

      switch (page) {
        case pages.FIRST:
          nextPage = 1;
          break;
        case pages.PREVIOUS:
          nextPage = currentPage - 1;
          break;
        case pages.NEXT:
          nextPage = currentPage + 1;
          break;
        case pages.LAST:
          nextPage = collectionState.totalPages;
          break;
        default:
          nextPage = payload.page;
      }

      dispatch(setServerSideCollectionPage({ collection, page: nextPage }));
      dispatch(fetchHandler());
    };
  };
}

export default createSetServerSideCollectionPageHandler;
