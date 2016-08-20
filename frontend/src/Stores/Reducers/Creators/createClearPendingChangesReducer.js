function createClearPendingChangesReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = {};
      newState[section] = Object.assign({}, state[section]);
      newState[section].pendingChanges = {};

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createClearPendingChangesReducer;
