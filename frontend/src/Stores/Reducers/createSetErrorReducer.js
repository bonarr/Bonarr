function getFetchingPropertyName(property) {
  return `${property}Error`;
}

function createSetErrorReducer(property) {
  const fetchingPropertyName = getFetchingPropertyName(property);

  return (state, { payload }) => {
    if (fetchingPropertyName === getFetchingPropertyName(payload.property)) {
      const newState = {};
      newState[fetchingPropertyName] = payload.fetching;

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createSetErrorReducer;
