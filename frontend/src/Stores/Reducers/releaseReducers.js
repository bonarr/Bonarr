import _ from 'lodash';
import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createSetReducer from './Creators/createSetReducer';
import createUpdateReducer from './Creators/createUpdateReducer';

export const defaultState = {
  fetching: false,
  populated: false,
  error: null,
  items: [],
  sortKey: 'releaseWeight',
  sortDirection: 'ascending'
};

const reducerSection = 'releases';

const releaseReducers = handleActions({

  [types.SET]: createSetReducer(reducerSection),
  [types.UPDATE]: createUpdateReducer(reducerSection),

  [types.CLEAR_RELEASES]: (state) => {
    return Object.assign({}, state, defaultState);
  },

  [types.UPDATE_RELEASE]: (state, { payload }) => {
    const guid = payload.guid;
    const newState = Object.assign({}, state);
    const items = newState.items;
    const item = Object.assign({}, _.find(items, { guid }), payload);

    newState.items = _.filter(items, (i) => i.guid !== guid);
    newState.items.push(item);

    return newState;
  }

}, defaultState);

export default releaseReducers;
