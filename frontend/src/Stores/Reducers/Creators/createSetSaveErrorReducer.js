function getSaveErrorPropertyName(property) {
  return `${property}SaveError`;
}

function createSetSaveErrorReducer(property) {
  const saveErrorPropertyName = getSaveErrorPropertyName(property);

  return (state, { payload }) => {
    if (saveErrorPropertyName === getSaveErrorPropertyName(payload.property)) {
      const newState = {};
      newState[saveErrorPropertyName] = payload.error;

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createSetSaveErrorReducer;
