import getSectionState from 'Utilities/State/getSectionState';
import updateSectionState from 'Utilities/State/updateSectionState';

function createFetchingReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = getSectionState(state, section);
      newState.fetching = payload.fetching;

      return updateSectionState(state, section, newState);
    }

    return state;
  };
}

export default createFetchingReducer;
