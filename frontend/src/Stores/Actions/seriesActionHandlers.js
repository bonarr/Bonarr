import $ from 'jquery';
import * as types from './actionTypes';
import createSaveProviderHandler from './Creators/createSaveProviderHandler';
import createRemoveItemHandler from './Creators/createRemoveItemHandler';
import { set, update } from './baseActions';

const section = 'series';

const seriesActionHandlers = {
  [types.FETCH_SERIES]: function(payload) {
    return function(dispatch, getState) {
      dispatch(set({ section, fetching: true }));

      const promise = $.ajax({
        url: '/series'
      });

      promise.done((data) => {
        dispatch(update({ section, data }));

        dispatch(set({
          section,
          fetching: false,
          populated: true,
          error: null
        }));
      });

      promise.fail((xhr) => {
        dispatch(set({
          section,
          fetching: false,
          populated: false,
          error: xhr
        }));
      });
    };
  },

  [types.SAVE_SERIES]: createSaveProviderHandler('series',
                                                 '/series',
                                                 (state) => state.series),

  [types.DELETE_SERIES]: createRemoveItemHandler('series',
                                                 '/series',
                                                 (state) => state.series)
};

export default seriesActionHandlers;
