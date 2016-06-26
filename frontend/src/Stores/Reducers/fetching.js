import titleCase from 'Utilities/String/titleCase';

const fetching = function (state, { payload }) {
  const fetchingProperty = `fetching${titleCase(payload.property)}`;

  if (state.hasOwnProperty(fetchingProperty)) {
    const newState = {};
    newState[fetchingProperty] = payload.fetching;

    return Object.assign({}, state, newState);
  }

  return state;
};

export default fetching;