function createReducers(propertyNames, createReducer) {
  const reducers = {};

  propertyNames.forEach((property) => {
    reducers[property] = createReducer(property);
  });

  return (state, action) => {
    const property = action.payload.property;
    const reducer = reducers[property];

    if (reducer) {
      return reducer(state, action);
    }

    return state;
  };
}

export default createReducers;
