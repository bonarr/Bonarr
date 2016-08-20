function createUpdateReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = {};
      const newStateSection = state[section];

      if (newStateSection.hasOwnProperty('item')) {
        newStateSection.item = payload.data;
      } else {
        newStateSection.items = payload.data;
      }

      newState[section] = newStateSection;

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createUpdateReducer;
