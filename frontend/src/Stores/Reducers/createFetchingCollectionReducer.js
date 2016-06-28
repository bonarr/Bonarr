const createFetchingCollectionReducer = (collection) => {
  return (state, { payload }) => {
    if (collection === payload.collection) {
      const newState = {};
      newState[collection] = state[collection];
      newState[collection].fetching = payload.fetching;

      return Object.assign({}, state, newState);
    }

    return state;
  };
};

export default createFetchingCollectionReducer;