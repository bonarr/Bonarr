import getSectionState from 'Utilities/State/getSectionState';
import updateSectionState from 'Utilities/State/updateSectionState';

function createSetServerSideCollectionSortReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = getSectionState(state, section);
      newState.sortKey = payload.sortKey;
      newState.sortDirection = payload.sortDirection;

      return updateSectionState(state, section, newState);
    }

    return state;
  };
}

export default createSetServerSideCollectionSortReducer;
