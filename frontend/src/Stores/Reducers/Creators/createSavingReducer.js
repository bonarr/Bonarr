import titleCase from 'Utilities/String/titleCase';

function getSavingPropertyName(property) {
  return `saving${titleCase(property)}`;
}

function createSavingReducer(property) {
  const savingPropertyName = getSavingPropertyName(property);

  return (state, { payload }) => {
    if (savingPropertyName === getSavingPropertyName(payload.property)) {
      const newState = {};
      newState[savingPropertyName] = payload.saving;

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createSavingReducer;
