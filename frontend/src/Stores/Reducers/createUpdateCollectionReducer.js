const createUpdateCollectionReducer = (collection) => {
  return (state, { payload }) => {
    if (collection === payload.collection) {
      const newState = {};
      newState[collection] = state[collection];
      newState[collection].items = payload.data;

      return Object.assign({}, state, newState);
    }

    return state;
  };
};

export default createUpdateCollectionReducer;