function createSetServerSideCollectionSortReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = {};
      newState[section] = state[section];
      newState[section].sortKey = payload.sortKey;
      newState[section].sortDirection = payload.sortDirection;

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createSetServerSideCollectionSortReducer;
