function createSetServerSideCollectionFilterReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = {};
      newState[section] = state[section];
      newState[section].filterKey = payload.filterKey;
      newState[section].filterValue = payload.filterValue;

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createSetServerSideCollectionFilterReducer;
