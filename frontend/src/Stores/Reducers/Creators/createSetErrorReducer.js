function createSetErrorReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = {};
      newState[section] = state[section];
      newState[section].error = payload.error;

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createSetErrorReducer;
