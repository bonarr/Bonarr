import * as types from './actionTypes';
import createFetchHandler from './Creators/createFetchHandler';
import createSaveProviderHandler from './Creators/createSaveProviderHandler';
import createRemoveItemHandler from './Creators/createRemoveItemHandler';

const seriesActionHandlers = {
  [types.FETCH_SERIES]: createFetchHandler('series', '/series'),

  [types.SAVE_SERIES]: createSaveProviderHandler('series',
                                                 '/series',
                                                 (state) => state.series),

  [types.DELETE_SERIES]: createRemoveItemHandler('series',
                                                 '/series',
                                                 (state) => state.series)
};

export default seriesActionHandlers;
