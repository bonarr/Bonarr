import getSectionState from 'Utilities/State/getSectionState';
import updateSectionState from 'Utilities/State/updateSectionState';
import createSetReducer from './createSetReducer';

function createClearPendingChangesReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = getSectionState(state, section);
      newState.pendingChanges = {};

      return updateSectionState(state, section, newState);
    }

    return state;
  };
}

export default createClearPendingChangesReducer;
