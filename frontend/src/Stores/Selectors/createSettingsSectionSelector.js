import { createSelector } from 'reselect';
import selectSettings from 'Stores/Selectors/selectSettings';

function createSettingsSectionSelector() {
  return createSelector(
    (state, { section }) => state.settings[section],
    (sectionSettings) => {
      const {
        fetching,
        error,
        item,
        pendingChanges,
        saving,
        saveError
      } = sectionSettings;

      const settings = selectSettings(item, pendingChanges, saveError);

      return {
        fetching,
        error,
        saving,
        ...settings
      };
    }
  );
}

export default createSettingsSectionSelector;
