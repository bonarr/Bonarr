import _ from 'underscore';

function createSetSettingValueReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const { name, value } = payload;
      const newState = {};
      newState[section] = Object.assign({}, state[section]);
      newState[section].pendingChanges = Object.assign({}, state[section].pendingChanges);

      const currentValue = state[section].item[name];
      const pendingState = newState[section].pendingChanges;

      let parsedValue = null;

      if (_.isNumber(currentValue)) {
        parsedValue = parseInt(value);
      } else {
        parsedValue = value;
      }

      if (currentValue === parsedValue) {
        delete pendingState[name];
      } else {
        pendingState[name] = parsedValue;
      }

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createSetSettingValueReducer;
