function createSetCollectionErrorReducer(collection) {
  return (state, { payload }) => {
    if (collection === payload.collection) {
      const newState = {};
      newState[collection] = state[collection];
      newState[collection].error = payload.error;

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createSetCollectionErrorReducer;
