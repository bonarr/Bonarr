import _ from 'underscore';

function getSetSettingValuePropertyName(property) {
  return `${property}PendingChanges`;
}

function createSetSettingValueReducer(property) {
  const setSettingValuePropertyName = getSetSettingValuePropertyName(property);

  return (state, { payload }) => {
    if (setSettingValuePropertyName === getSetSettingValuePropertyName(payload.property)) {
      const { name, value } = payload;
      const newState = Object.assign({}, state);
      newState[setSettingValuePropertyName] = Object.assign({}, state[setSettingValuePropertyName]);

      const currentValue = state[property][name];
      const pendingState = newState[setSettingValuePropertyName];

      if (_.isNumber(currentValue)) {
        pendingState[name] = parseInt(value);
      } else {
        pendingState[name] = value;
      }

      newState.pendingState = pendingState;

      return newState;
    }

    return state;
  };
}

export default createSetSettingValueReducer;
