import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers, { defaultState } from 'Stores/Reducers';
import persistState from 'Stores/Middleware/persistState';

const middlewares = compose(
  applyMiddleware(thunk),
  persistState
);

const test =  defaultState;
const appStore = createStore(
  reducers,
  defaultState,
  middlewares
);

export default appStore;
