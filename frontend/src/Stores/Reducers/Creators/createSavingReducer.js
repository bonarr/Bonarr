import getSectionState from 'Utilities/State/getSectionState';
import updateSectionState from 'Utilities/State/updateSectionState';

function createSavingReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = getSectionState(state, section);
      newState.saving = payload.saving;

      return updateSectionState(state, section, newState);
    }

    return state;
  };
}

export default createSavingReducer;
