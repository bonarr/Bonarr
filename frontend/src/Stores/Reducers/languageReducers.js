import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createFetchingReducer from './Creators/createFetchingReducer';
import createSetErrorReducer from './Creators/createSetErrorReducer';
import createUpdateReducer from './Creators/createUpdateReducer';

const defaultState = {
  fetching: false,
  error: null,
  items: []
};

const reducerSection = 'languages';

const languageReducers = handleActions({

  [types.FETCHING]: createFetchingReducer(reducerSection),
  [types.SET_ERROR]: createSetErrorReducer(reducerSection),
  [types.UPDATE]: createUpdateReducer(reducerSection)

}, defaultState);

export default languageReducers;
