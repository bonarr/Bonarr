import _ from 'lodash';
import persistState from 'redux-localstorage';
import { persistState as settingsPersistState } from 'Stores/Reducers/settingsReducers';

function slicer(paths) {
  return (state) => {
    const subset = {};

    paths.forEach((path) => {
      _.set(subset, path, _.get(state, path));
    });

    return subset;
  };
}

function merge(initialState, persistedState) {
  const result = persistedState ? _.merge(initialState, persistedState) : initialState;

  return result;
}

const paths = [
  ...settingsPersistState
];

const config = {
  slicer,
  merge
};

export default persistState(paths, config);
