import _ from 'lodash';
import getSectionState from 'Utilities/State/getSectionState';
import updateSectionState from 'Utilities/State/updateSectionState';

function createDeleteThingyReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = _.cloneDeep(getSectionState(state, section));
      _.remove(newState.items, { id: payload.id });

      var t1 = 1;
      var t2 = 1;
      return updateSectionState(state, section, newState);
    }

    return state;
  };
}

export default createDeleteThingyReducer;
