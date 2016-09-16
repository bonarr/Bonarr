import getSectionState from 'Utilities/State/getSectionState';
import updateSectionState from 'Utilities/State/updateSectionState';

function createSetServerSideCollectionPageReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = getSectionState(state, section);
      newState.page = payload.page;

      return updateSectionState(state, section, newState);
    }

    return state;
  };
}

export default createSetServerSideCollectionPageReducer;
