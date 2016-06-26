import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from 'Stores/Reducers';

const defaultState = {

};

const reducer = combineReducers(reducers);
const appStore = createStore(
  reducer,
  defaultState,
  applyMiddleware(thunk)
);

export default appStore;
