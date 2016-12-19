import _ from 'lodash';
import persistState from 'redux-localstorage';
import { persistState as seriesIndexPersistState } from 'Stores/Reducers/seriesIndexReducers';
import { persistState as calendarPersistState } from 'Stores/Reducers/calendarReducers';
import { persistState as historyPersistState } from 'Stores/Reducers/historyReducers';
import { persistState as blacklistPersistState } from 'Stores/Reducers/blacklistReducers';
import { persistState as wantedPersistState } from 'Stores/Reducers/wantedReducers';
import { persistState as settingsPersistState } from 'Stores/Reducers/settingsReducers';
import { persistState as systemPersistState } from 'Stores/Reducers/systemReducers';
import { persistState as manualImportPersistState } from 'Stores/Reducers/manualImportReducers';

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
  ...seriesIndexPersistState,
  ...calendarPersistState,
  ...historyPersistState,
  ...blacklistPersistState,
  ...wantedPersistState,
  ...settingsPersistState,
  ...systemPersistState,
  ...manualImportPersistState
];

const config = {
  slicer,
  merge,
  key: 'sonarr'
};

export default persistState(paths, config);
