import _ from 'lodash';
import $ from 'jquery';
import * as types from './actionTypes';
import { set, update, updateItem } from './baseActions';

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

  [types.TOGGLE_EPISODE_MONITORED]: function(payload) {
    return function(dispatch, getState) {
      const {
        episodeId: id,
        episodeEntity,
        monitored
      } = payload;

      const episodeSection = _.last(episodeEntity.split('.'));

      dispatch(updateItem({
        id,
        section: episodeSection,
        isSaving: true
      }));

      const promise = $.ajax({
        url: `/episode/${id}`,
        method: 'PUT',
        data: JSON.stringify({ monitored }),
        dataType: 'json'
      });

      promise.done((data) => {
        dispatch(updateItem({
          id,
          section: episodeSection,
          isSaving: false,
          monitored
        }));
      });

      promise.fail((xhr) => {
        dispatch(updateItem({
          id,
          section: episodeSection,
          isSaving: false
        }));
      });
    };
  }
};

export default episodeActionHandlers;
