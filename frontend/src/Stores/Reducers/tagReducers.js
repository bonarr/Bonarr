import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createSetReducer from './Creators/createSetReducer';
import createUpdateReducer from './Creators/createUpdateReducer';

const defaultState = {
  fetching: false,
  populated: false,
  error: null,
  items: []
};

const reducerSection = 'tags';

const tagReducers = handleActions({

  [types.SET]: createSetReducer(reducerSection),
  [types.UPDATE]: createUpdateReducer(reducerSection)

}, defaultState);

export default tagReducers;
