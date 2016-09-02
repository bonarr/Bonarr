import { handleActions } from 'redux-actions';
import * as types from 'Stores/Actions/actionTypes';
import createFetchingReducer from './Creators/createFetchingReducer';
import createSetErrorReducer from './Creators/createSetErrorReducer';

const defaultState = {
  currentPath: '',
  fetching: false,
  error: null,
  directories: [],
  files: [],
  parent: ''
};

const reducerSection = 'paths';

const pathReducers = handleActions({

  [types.FETCHING]: createFetchingReducer(reducerSection),
  [types.SET_ERROR]: createSetErrorReducer(reducerSection),

  [types.UPDATE_PATHS]: (state, { payload }) => {
    const newState = Object.assign({}, state);

    newState.currentPath = payload.path;
    newState.directories = payload.directories;
    newState.files = payload.files;
    newState.parent = payload.parent;

    return newState;
  },

  [types.CLEAR_PATHS]: (state, { payload }) => {
    const newState = Object.assign({}, state);

    newState.path = '';
    newState.directories = [];
    newState.files = [];
    newState.parent = '';

    return newState;
  }

}, defaultState);

export default pathReducers;
