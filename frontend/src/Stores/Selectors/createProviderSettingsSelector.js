import _ from 'lodash';
import { createSelector } from 'reselect';
import selectSettings from 'Stores/Selectors/selectSettings';

function createProviderSettingsSelector() {
  return createSelector(
    (state, { id }) => id,
    (state, { section }) => state.settings[section],
    (id, section) => {
      if (!id) {
        const item = _.isArray(section.schema) ? section.selectedSchema : section.schema;
        const settings = selectSettings(Object.assign({ name: '' }, item), section.pendingChanges, section.saveError);

        const {
          fetchingSchema: fetching,
          schemaError: error,
          saving,
          saveError,
          testing,
          pendingChanges
        } = section;

        return {
          fetching,
          error,
          saving,
          saveError,
          testing,
          pendingChanges,
          ...settings,
          item: settings.settings
        };
      }

      const {
        fetching,
        error,
        saving,
        saveError,
        testing,
        pendingChanges
      } = section;

      const settings = selectSettings(_.find(section.items, { id }), pendingChanges, saveError);

      return {
        fetching,
        error,
        saving,
        saveError,
        testing,
        item: settings.settings,
        ...settings
      };
    }
  );
}

export default createProviderSettingsSelector;
