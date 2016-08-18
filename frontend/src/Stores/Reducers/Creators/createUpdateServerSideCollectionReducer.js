import _ from 'underscore';

function createUpdateServerSideCollectionReducer(collection) {
  return (state, { payload }) => {
    if (collection === payload.collection) {
      const data = payload.data;
      const newState = {};
      newState[collection] = state[collection];

      const serverState = _.omit(data, ['records']);
      const calculatedState = {
        totalPages: Math.max(Math.ceil(data.totalRecords / data.pageSize), 1),
        items: data.records
      };

      newState[collection] = Object.assign(newState[collection], serverState, calculatedState);

      return Object.assign({}, state, newState);
    }

    return state;
  };
}

export default createUpdateServerSideCollectionReducer;
