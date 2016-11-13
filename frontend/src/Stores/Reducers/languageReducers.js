import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createSetReducer from './Creators/createSetReducer';
import createUpdateReducer from './Creators/createUpdateReducer';

export const defaultState = {
  fetching: false,
  populated: false,
  error: null,
  items: []
};

const reducerSection = 'languages';

const languageReducers = handleActions({

  [types.SET]: createSetReducer(reducerSection),
  [types.UPDATE]: createUpdateReducer(reducerSection)

}, defaultState);

export default languageReducers;
