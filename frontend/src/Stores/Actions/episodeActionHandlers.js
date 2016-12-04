import $ from 'jquery';
import createSetClientSideCollectionSortHandler from 'Stores/Actions/Creators/createSetClientSideCollectionSortHandler';
import * as types from './actionTypes';
import { set, update } from './baseActions';

const section = 'episodes';

const episodeActionHandlers = {
  [types.FETCH_EPISODES]: function(payload) {
    return function(dispatch, getState) {
      dispatch(set({ section, fetching: true }));

      const promise = $.ajax({
        url: '/episode',
        data: payload,
        traditional: true
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

  [types.SET_EPISODES_SORT]: createSetClientSideCollectionSortHandler(section, (state) => state)
};

export default episodeActionHandlers;
