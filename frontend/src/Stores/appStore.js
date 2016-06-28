import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'Stores/Reducers';

const defaultState = {

};

const appStore = createStore(
  reducers,
  defaultState,
  applyMiddleware(thunk)
);

export default appStore;
