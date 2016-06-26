const fetchingCollection = function (state, { payload }) {
  if (state[payload.property]) {
    const newState = {};
    newState[payload.property] = payload.data;

    return Object.assign({}, state, newState);
  }

  return state;
};

export default fetchingCollection;