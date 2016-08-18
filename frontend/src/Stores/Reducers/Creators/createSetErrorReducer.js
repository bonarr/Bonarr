function getErrorPropertyName(property) {
  return `${property}Error`;
}

function createSetErrorReducer(property) {
  const errorPropertyName = getErrorPropertyName(property);

  return (state, { payload }) => {
    if (errorPropertyName === getErrorPropertyName(payload.property)) {
      const newState = {};
      newState[errorPropertyName] = payload.error;

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createSetErrorReducer;
