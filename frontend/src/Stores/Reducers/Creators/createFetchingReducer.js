function createFetchingReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = {};
      newState[section] = state[section];
      newState[section].fetching = payload.fetching;

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createFetchingReducer;
