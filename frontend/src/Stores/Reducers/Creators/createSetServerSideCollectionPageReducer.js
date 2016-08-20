function createSetServerSideCollectionPageReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = {};
      newState[section] = state[section];
      newState[section].page = payload.page;

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createSetServerSideCollectionPageReducer;
