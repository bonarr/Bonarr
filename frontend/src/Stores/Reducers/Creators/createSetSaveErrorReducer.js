function createSetSaveErrorReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = {};
      newState[section] = Object.assign({}, state[section]);
      newState[section].saveError = payload.saveError;

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createSetSaveErrorReducer;
