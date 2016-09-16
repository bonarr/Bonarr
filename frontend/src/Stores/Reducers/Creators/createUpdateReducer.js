import getSectionState from 'Utilities/State/getSectionState';
import updateSectionState from 'Utilities/State/updateSectionState';

function createUpdateReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = getSectionState(state, section);

      if (newState.hasOwnProperty('item')) {
        newState.item = payload.data;
      } else {
        newState.items = payload.data;
      }

      return updateSectionState(state, section, newState);
    }

    return state;
  };
}

export default createUpdateReducer;
