import getSectionState from 'Utilities/State/getSectionState';
import updateSectionState from 'Utilities/State/updateSectionState';

function createSetErrorReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = getSectionState(state, section);
      newState.error = payload.error;

      return updateSectionState(state, section, newState);
    }

    return state;
  };
}

export default createSetErrorReducer;
