import titleCase from 'Utilities/String/titleCase';

function getFetchingPropertyName(property) {
  return `fetching${titleCase(property)}`;
}


const createFetchingReducer = (property) => {
  const fetchingPropertyName = getFetchingPropertyName(property);

  return (state, { payload }) => {
    if (fetchingPropertyName === getFetchingPropertyName(payload.property)) {
      const newState = {};
      newState[fetchingPropertyName] = payload.fetching;

      return Object.assign({}, state, newState);
    }

    return state;
  };
};

export default createFetchingReducer;