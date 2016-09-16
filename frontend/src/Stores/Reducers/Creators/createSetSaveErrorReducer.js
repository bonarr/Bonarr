import getSectionState from 'Utilities/State/getSectionState';
import updateSectionState from 'Utilities/State/updateSectionState';

function createSetSaveErrorReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = getSectionState(state, section);
      newState.saveError = payload.saveError;

      return updateSectionState(state, section, newState);
    }

    return state;
  };
}

export default createSetSaveErrorReducer;
