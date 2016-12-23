import * as types from './actionTypes';
import createFetchHandler from './Creators/createFetchHandler';
import createSaveProviderHandler from './Creators/createSaveProviderHandler';
import createRemoveItemHandler from './Creators/createRemoveItemHandler';

const rootFolderActionHandlers = {
  [types.FETCH_ROOT_FOLDERS]: createFetchHandler('rootFolders', '/rootFolder'),

  [types.ADD_ROOT_FOLDER]: createSaveProviderHandler('rootFolders',
                                                     '/rootFolder',
                                                     (state) => state.rootFolders),

  [types.DELETE_ROOT_FOLDER]: createRemoveItemHandler('rootFolders',
                                                      '/rootFolder',
                                                      (state) => state.rootFolders)
};

export default rootFolderActionHandlers;
