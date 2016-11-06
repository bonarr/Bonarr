import _ from 'lodash';
import getSectionState from 'Utilities/State/getSectionState';
import updateSectionState from 'Utilities/State/updateSectionState';

function createUpdateProviderReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = _.cloneDeep(getSectionState(state, section));
      const index = _.findIndex(newState.items, { id: payload.data.id });

      if (index >= 0) {
        newState.items[index] = payload.data;
      } else {
        newState.items.push(payload.data);
      }

      return updateSectionState(state, section, newState);
    }

    return state;
  };
}

export default createUpdateProviderReducer;
