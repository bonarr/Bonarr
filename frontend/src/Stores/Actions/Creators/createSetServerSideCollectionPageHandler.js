import pages from 'Utilities/pages';
import { setServerSideCollectionPage } from '../baseActions';

function createSetServerSideCollectionPageHandler(section, page, getFromState, fetchHandler) {
  return function(payload) {
    return function(dispatch, getState) {
      const sectionState = getFromState(getState())[section];
      const currentPage = sectionState.page || 1;
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
          nextPage = sectionState.totalPages;
          break;
        default:
          nextPage = payload.page;
      }

      dispatch(setServerSideCollectionPage({ section, page: nextPage }));
      dispatch(fetchHandler());
    };
  };
}

export default createSetServerSideCollectionPageHandler;
