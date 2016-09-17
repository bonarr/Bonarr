import _ from 'lodash';

function getValidationFailures(saveError, isWarning) {
  if (!saveError || saveError.status !== 400) {
    return [];
  }

  return saveError.responseJSON;
}

function selectSettings(item, pendingChanges, saveError) {
  const validationFailures = getValidationFailures(saveError);

  const settings = _.reduce(Object.assign({}, item, pendingChanges), (result, value, key) => {
    const setting = {
      value,
      pending: pendingChanges.hasOwnProperty(key),
      errors: _.map(_.remove(validationFailures, (failure) => {
        return failure.propertyName.toLowerCase() === key.toLowerCase() && !failure.isWarning;
      }), (failure) => failure.errorMessage),
      warnings: _.map(_.remove(validationFailures, (failure) => {
        return failure.propertyName.toLowerCase() === key.toLowerCase() && failure.isWarning;
      }), (failure) => failure.errorMessage)
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
    settings,
    validationErrors,
    validationWarnings,
    hasPendingChanges: !_.isEmpty(pendingChanges),
    hasSettings: !_.isEmpty(settings)
  };
}

export default selectSettings;
