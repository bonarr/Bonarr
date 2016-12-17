import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import { sortDirections } from 'Helpers/Props';
import createSetReducer from './Creators/createSetReducer';
import createUpdateReducer from './Creators/createUpdateReducer';
import createUpdateItemReducer from './Creators/createUpdateItemReducer';
import createSetClientSideCollectionSortReducer from './Creators/createSetClientSideCollectionSortReducer';

export const defaultState = {
  fetching: false,
  populated: false,
  error: null,
  items: [],
  sortKey: 'episodeNumber',
  sortDirection: sortDirections.DESCENDING
};

const reducerSection = 'episodes';

const episodeReducers = handleActions({

  [types.SET]: createSetReducer(reducerSection),
  [types.UPDATE]: createUpdateReducer(reducerSection),
  [types.UPDATE_ITEM]: createUpdateItemReducer(reducerSection),

  [types.CLEAR_EPISODES]: (state) => {
    return Object.assign({}, state, defaultState);
  },

  [types.SET_EPISODES_SORT]: createSetClientSideCollectionSortReducer(reducerSection)

}, defaultState);

export default episodeReducers;
