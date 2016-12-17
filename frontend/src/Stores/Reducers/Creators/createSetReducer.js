import _ from 'lodash';
import getSectionState from 'Utilities/State/getSectionState';
import updateSectionState from 'Utilities/State/updateSectionState';

const whitelistedProperties = [
  'fetching',
  'populated',
  'error',
  'fetchingSchema',
  'schemaPopulated',
  'schemaError',
  'schema',
  'selectedSchema',
  'saving',
  'saveError',
  'testing',
  'deleting',
  'deleteError',
  'pendingChanges',
  'filterKey',
  'filterValue',
  'page',
  'sortKey',
  'sortDirection'
];

const blacklistedProperties = [
  'section',
  'id'
];

function createSetReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = Object.assign(getSectionState(state, section),
                                     _.omit(payload, blacklistedProperties));

      return updateSectionState(state, section, newState);
    }

    return state;
  };
}

export default createSetReducer;
