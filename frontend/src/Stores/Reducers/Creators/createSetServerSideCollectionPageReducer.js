function createSetServerSideCollectionPageReducer(collection) {
  return (state, { payload }) => {
    if (collection === payload.collection) {
      const newState = {};
      newState[collection] = state[collection];
      newState[collection].page = payload.page;

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createSetServerSideCollectionPageReducer;
