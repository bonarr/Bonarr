import serverSideCollectionHandlers from 'Utilities/serverSideCollectionHandlers';
import * as types from './actionTypes';
import createServerSideCollectionHandlers from './Creators/createServerSideCollectionHandlers';

const wantedActionHandlers = {
  ...createServerSideCollectionHandlers('missing', '/wanted/missing', (state) => state.wanted, {
    [serverSideCollectionHandlers.FETCH]: types.FETCH_MISSING,
    [serverSideCollectionHandlers.FIRST_PAGE]: types.GOTO_FIRST_MISSING_PAGE,
    [serverSideCollectionHandlers.PREVIOUS_PAGE]: types.GOTO_PREVIOUS_MISSING_PAGE,
    [serverSideCollectionHandlers.NEXT_PAGE]: types.GOTO_NEXT_MISSING_PAGE,
    [serverSideCollectionHandlers.LAST_PAGE]: types.GOTO_LAST_MISSING_PAGE,
    [serverSideCollectionHandlers.EXACT_PAGE]: types.GOTO_MISSING_PAGE,
    [serverSideCollectionHandlers.SORT]: types.SET_MISSING_SORT,
    [serverSideCollectionHandlers.FILTER]: types.SET_MISSING_FILTER
  })
};

export default wantedActionHandlers;
