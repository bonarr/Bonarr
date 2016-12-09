import { handleActions } from 'redux-actions';
import getSectionState from 'Utilities/State/getSectionState';
import updateSectionState from 'Utilities/State/updateSectionState';
import { sortDirections } from 'Helpers/Props';
import * as types from 'Stores/Actions/actionTypes';
import createSetReducer from './Creators/createSetReducer';
import createUpdateReducer from './Creators/createUpdateReducer';
import createUpdateItemReducer from './Creators/createUpdateItemReducer';
import createReducers from './Creators/createReducers';
import createUpdateServerSideCollectionReducer from './Creators/createUpdateServerSideCollectionReducer';

export const defaultState = {
  status: {
    fetching: false,
    populated: false,
    error: null,
    item: {}
  },

  details: {
    fetching: false,
    populated: false,
    error: null,
    items: []
  },

  paged: {
    fetching: false,
    populated: false,
    pageSize: 20,
    sortKey: 'timeleft',
    sortDirection: sortDirections.ASCENDING,
    error: null,
    items: []
  },

  episodes: {
    items: []
  }
};

export const persistState = [
  'queue.paged.sortKey',
  'queue.paged.sortDirection'
];

const propertyNames = [
  'status',
  'details',
  'episodes'
];

const paged = 'paged';

const queueReducers = handleActions({

  [types.SET]: createReducers([...propertyNames, paged], createSetReducer),
  [types.UPDATE]: createReducers([...propertyNames, paged], createUpdateReducer),
  [types.UPDATE_ITEM]: createReducers(['episodes', paged], createUpdateItemReducer),

  [types.CLEAR_QUEUE_DETAILS]: function(state) {
    const section = 'details';
    const newState = Object.assign(getSectionState(state, section), defaultState.details);

    return updateSectionState(state, section, newState);
  },

  [types.UPDATE_SERVER_SIDE_COLLECTION]: createUpdateServerSideCollectionReducer(paged),

  [types.SET_QUEUE_EPISODES]: function(state, { payload }) {
    const section = 'episodes';

    return updateSectionState(state, section, { items: payload.episodes });
  }

}, defaultState);

export default queueReducers;
