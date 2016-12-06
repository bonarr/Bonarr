import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import { sortDirections } from 'Helpers/Props';
import createSetReducer from './Creators/createSetReducer';
import createUpdateReducer from './Creators/createUpdateReducer';
import createUpdateServerSideCollectionReducer from './Creators/createUpdateServerSideCollectionReducer';

const reducerSection = 'blacklist';

export const defaultState = {
  fetching: false,
  populated: false,
  pageSize: 20,
  sortKey: 'date',
  sortDirection: sortDirections.DESCENDING,
  error: null,
  items: []
};

export const persistState = [
  'sortKey',
  'sortDirection'
];

const blacklistReducers = handleActions({

  [types.SET]: createSetReducer(reducerSection),
  [types.UPDATE]: createUpdateReducer(reducerSection),
  [types.UPDATE_SERVER_SIDE_COLLECTION]: createUpdateServerSideCollectionReducer(reducerSection)

}, defaultState);

export default blacklistReducers;
