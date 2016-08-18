function createSetServerSideCollectionFilterReducer(collection) {
  return (state, { payload }) => {
    if (collection === payload.collection) {
      const newState = {};
      newState[collection] = state[collection];
      newState[collection].filterKey = payload.filterKey;
      newState[collection].filterValue = payload.filterValue;

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createSetServerSideCollectionFilterReducer;
