import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createSetReducer from './Creators/createSetReducer';
import createUpdateReducer from './Creators/createUpdateReducer';
import createRemoveItemReducer from './Creators/createRemoveItemReducer';

export const defaultState = {
  fetching: false,
  populated: false,
  error: null,
  items: []
};

const reducerSection = 'rootFolders';

const rootFolderReducers = handleActions({

  [types.SET]: createSetReducer(reducerSection),
  [types.UPDATE]: createUpdateReducer(reducerSection),
  [types.REMOVE_ITEM]: createRemoveItemReducer(reducerSection)

}, defaultState);

export default rootFolderReducers;
