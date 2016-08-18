function getPendingChangesPropertyName(property) {
  return `${property}PendingChanges`;
}

function createClearPendingChangesReducer(property) {
  const pendingChangesPropertyName = getPendingChangesPropertyName(property);

  return (state, { payload }) => {
    if (pendingChangesPropertyName === getPendingChangesPropertyName(payload.property)) {
      const newState = Object.assign({}, state);

      newState[pendingChangesPropertyName] = {};

      return newState;
    }

    return state;
  };
}

export default createClearPendingChangesReducer;
