import _ from 'underscore';

function createUpdateServerSideCollectionReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const data = payload.data;
      const newState = {};

      const serverState = _.omit(data, ['records']);
      const calculatedState = {
        totalPages: Math.max(Math.ceil(data.totalRecords / data.pageSize), 1),
        items: data.records
      };

      newState[section] = Object.assign({}, state[section], serverState, calculatedState);

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createUpdateServerSideCollectionReducer;
