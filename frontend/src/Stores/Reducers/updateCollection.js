const fetchingCollection = function (state, { payload }) {
  if (state[payload.collection]) {
    const newState = {};
    newState[payload.collection] = state[payload.collection];
    newState[payload.collection].items = payload.data;

    return Object.assign({}, state, newState);
  }

  return state;
};

export default fetchingCollection;