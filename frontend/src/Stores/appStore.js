import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers, { defaultState } from 'Stores/Reducers';
import persistState from 'Stores/Middleware/persistState';
import { fetchSeries } from 'Stores/Actions/seriesActions';
import { fetchTags } from 'Stores/Actions/tagActions';
import { fetchQualityProfiles } from 'Stores/Actions/settingsActions';

const middlewares = compose(
  applyMiddleware(thunk),
  persistState
);

const appStore = createStore(
  reducers,
  defaultState,
  middlewares
);

appStore.dispatch(fetchSeries());
appStore.dispatch(fetchTags());
appStore.dispatch(fetchQualityProfiles());

export default appStore;
