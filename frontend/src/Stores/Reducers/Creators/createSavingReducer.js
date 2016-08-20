function createSavingReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = {};
      newState[section] = Object.assign({}, state[section]);
      newState[section].saving = payload.saving;

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createSavingReducer;
