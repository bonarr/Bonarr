import getSectionState from 'Utilities/State/getSectionState';
import updateSectionState from 'Utilities/State/updateSectionState';

function createSetServerSideCollectionFilterReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = getSectionState(state, section);
      newState.filterKey = payload.filterKey;
      newState.filterValue = payload.filterValue;

      return updateSectionState(state, section, newState);
    }

    return state;
  };
}

export default createSetServerSideCollectionFilterReducer;
