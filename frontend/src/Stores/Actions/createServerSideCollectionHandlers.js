import serverSideCollectionHandlers from 'Utilities/serverSideCollectionHandlers';
import pages from 'Utilities/pages';
import createFetchServerSideCollectionHandler from './createFetchServerSideCollectionHandler';
import createSetServerSideCollectionPageHander from './createSetServerSideCollectionPageHander';
import createSetServerSideCollectionSortHander from './createSetServerSideCollectionSortHander';
import createSetServerSideCollectionFilterHander from './createSetServerSideCollectionFilterHander';

function createServerSideCollectionHandlers(collection, url, getFromState, handlers) {
  const actionHandlers = {};
  const fetchHandlerType = handlers[serverSideCollectionHandlers.FETCH];
  const fetchHandler = createFetchServerSideCollectionHandler(collection, url, getFromState);
  actionHandlers[fetchHandlerType] = fetchHandler;

  if (handlers.hasOwnProperty(serverSideCollectionHandlers.FIRST_PAGE)) {
    const handlerType = handlers[serverSideCollectionHandlers.FIRST_PAGE];
    actionHandlers[handlerType] = createSetServerSideCollectionPageHander(collection, pages.FIRST, getFromState, fetchHandler);
  }

  if (handlers.hasOwnProperty(serverSideCollectionHandlers.PREVIOUS_PAGE)) {
    const handlerType = handlers[serverSideCollectionHandlers.PREVIOUS_PAGE];
    actionHandlers[handlerType] = createSetServerSideCollectionPageHander(collection, pages.PREVIOUS, getFromState, fetchHandler);
  }

  if (handlers.hasOwnProperty(serverSideCollectionHandlers.NEXT_PAGE)) {
    const handlerType = handlers[serverSideCollectionHandlers.NEXT_PAGE];
    actionHandlers[handlerType] = createSetServerSideCollectionPageHander(collection, pages.NEXT, getFromState, fetchHandler);
  }

  if (handlers.hasOwnProperty(serverSideCollectionHandlers.LAST_PAGE)) {
    const handlerType = handlers[serverSideCollectionHandlers.LAST_PAGE];
    actionHandlers[handlerType] = createSetServerSideCollectionPageHander(collection, pages.LAST, getFromState, fetchHandler);
  }

  if (handlers.hasOwnProperty(serverSideCollectionHandlers.EXACT_PAGE)) {
    const handlerType = handlers[serverSideCollectionHandlers.EXACT_PAGE];
    actionHandlers[handlerType] = createSetServerSideCollectionPageHander(collection, pages.EXACT, getFromState, fetchHandler);
  }

  if (handlers.hasOwnProperty(serverSideCollectionHandlers.SORT)) {
    const handlerType = handlers[serverSideCollectionHandlers.SORT];
    actionHandlers[handlerType] = createSetServerSideCollectionSortHander(collection, getFromState, fetchHandler);
  }

  if (handlers.hasOwnProperty(serverSideCollectionHandlers.FILTER)) {
    const handlerType = handlers[serverSideCollectionHandlers.FILTER];
    actionHandlers[handlerType] = createSetServerSideCollectionFilterHander(collection, getFromState, fetchHandler);
  }

  return actionHandlers;
}

export default createServerSideCollectionHandlers;
