import _ from 'lodash';
import { createSelector } from 'reselect';
import selectSettings from 'Stores/Selectors/selectSettings';

function createThingySettingsSelector() {
  return createSelector(
    (state, { id }) => id,
    (state, { section }) => state.settings[section],
    (state, { schemaSection }) => state.settings[schemaSection],
    (id, section, schema) => {
      if (!id) {
        const item = Object.assign({ name: '' }, schema.item);
        const settings = selectSettings(item, schema.pendingChanges, schema.saveError);

        return {
          ...schema,
          ...settings,
          item: settings.settings
        };
      }

      const {
        fetching,
        error,
        saving,
        saveError,
        pendingChanges
      } = schema;

      const settings = selectSettings(_.find(section.items, { id }), pendingChanges, saveError);

      return {
        fetching,
        error,
        saving,
        saveError,
        item: settings.settings,
        ...settings
      };
    }
  );
}

export default createThingySettingsSelector;
