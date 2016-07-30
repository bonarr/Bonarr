function createSetServerSideCollectionSortReducer(collection) {
  return (state, { payload }) => {
    if (collection === payload.collection) {
      const newState = {};
      newState[collection] = state[collection];
      newState[collection].sortKey = payload.sortKey;
      newState[collection].sortDirection = payload.sortDirection;

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createSetServerSideCollectionSortReducer;
