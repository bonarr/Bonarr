import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import { sortDirections } from 'Helpers/Props';
import createSetReducer from './Creators/createSetReducer';
import createUpdateReducer from './Creators/createUpdateReducer';
import createUpdateItemReducer from './Creators/createUpdateItemReducer';
import createUpdateServerSideCollectionReducer from './Creators/createUpdateServerSideCollectionReducer';

export const defaultState = {
  fetching: false,
  populated: false,
  pageSize: 20,
  sortKey: 'date',
  sortDirection: sortDirections.DESCENDING,
  filterKey: null,
  filterValue: null,
  error: null,
  items: []
};

export const persistState = [
  'history.sortKey',
  'history.sortDirection',
  'history.filterKey',
  'history.filterValue'
];

const serverSideCollectionName = 'history';

const historyReducers = handleActions({

  [types.SET]: createSetReducer(serverSideCollectionName),
  [types.UPDATE]: createUpdateReducer(serverSideCollectionName),
  [types.UPDATE_ITEM]: createUpdateItemReducer(serverSideCollectionName),
  [types.UPDATE_SERVER_SIDE_COLLECTION]: createUpdateServerSideCollectionReducer(serverSideCollectionName)

}, defaultState);

export default historyReducers;
