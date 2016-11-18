import { handleActions } from 'redux-actions';
import getSectionState from 'Utilities/State/getSectionState';
import updateSectionState from 'Utilities/State/updateSectionState';
import * as types from 'Stores/Actions/actionTypes';
import createSetReducer from './Creators/createSetReducer';
import createUpdateReducer from './Creators/createUpdateReducer';
import createReducers from './Creators/createReducers';

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
  }
};

const propertyNames = [
  'status',
  'details'
];

const queueReducers = handleActions({

  [types.SET]: createReducers(propertyNames, createSetReducer),
  [types.UPDATE]: createReducers(propertyNames, createUpdateReducer),

  [types.CLEAR_QUEUE_DETAILS]: (state) => {
    const section = 'details';
    const newState = Object.assign(getSectionState(state, section), defaultState.details);

    return updateSectionState(state, section, newState);
  }

}, defaultState);

export default queueReducers;
