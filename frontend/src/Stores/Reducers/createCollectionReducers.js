const createReducers = (collectionNames, createReducer) => {
  const reducers = {};

  collectionNames.forEach((property) => {
    reducers[property] = createReducer(property);
  });

  return (state, action) => {
    const collection = action.payload.collection;
    const reducer = reducers[collection];

    if (reducer) {
      return reducer(state, action);
    }

    return state;
  };
};

export default createReducers;
