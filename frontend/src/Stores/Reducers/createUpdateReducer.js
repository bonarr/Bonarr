function createUpdateReducer(property) {
  return (state, { payload }) => {
    if (property === payload.property) {
      const newState = {};
      newState[property] = payload.data;

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createUpdateReducer;
