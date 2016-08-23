import _ from 'lodash';
import { createSelector } from 'reselect';

function getValidationFailures(saveError, isWarning) {
  if (!saveError || saveError.status !== 400) {
    return [];
  }

  return saveError.responseJSON;
}

function createSettingsSectionSelector() {
  return createSelector(
    (state) => state.settings,
    (state, { section }) => section,
    (settings, section) => {
      const {
        fetching,
        error,
        item,
        pendingChanges,
        saving,
        saveError
      } = settings[section];

      const validationFailures = getValidationFailures(saveError);

      const sectionSettings = _.reduce(Object.assign({}, item, pendingChanges), (result, value, key) => {
        const setting = {
          value,
          pending: pendingChanges.hasOwnProperty(key),
          errors: _.remove(validationFailures, (failure) => {
            return failure.propertyName.toLowerCase() === key.toLowerCase() && !failure.isWarning;
          }),
          warnings: _.remove(validationFailures, (failure) => {
            return failure.propertyName.toLowerCase() === key.toLowerCase() && failure.isWarning;
          })
        };

        result[key] = setting;
        return result;
      }, {});

      const validationErrors = _.filter(validationFailures, (failure) => {
        return !failure.isWarning;
      });

      const validationWarnings = _.filter(validationFailures, (failure) => {
        return failure.isWarning;
      });

      return {
        fetching,
        error,
        settings: sectionSettings,
        saving,
        validationErrors,
        validationWarnings,
        hasPendingChanges: !_.isEmpty(pendingChanges)
      };
    }
  );
}

export default createSettingsSectionSelector;
