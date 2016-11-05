import _ from 'lodash';

function getProviderState(payload, getState, getFromState, getProvidersFromState) {
  const id = payload.id;
  const state = getFromState(getState());
  const providersState = getProvidersFromState(getState());
  const pendingChanges = Object.assign({}, state.pendingChanges);
  const pendingFields = state.pendingChanges.fields || {};
  delete pendingChanges.fields;

  const item = id ? _.find(providersState.items, { id }) : state.item;

  if (item.fields) {
    pendingChanges.fields = _.reduce(item.fields, (result, field) => {
      const value = pendingFields.hasOwnProperty(field.name) ?
        pendingFields[field.name] :
        field.value;

      result.push({
        ...field,
        value
      });

      return result;
    }, []);
  }

  return Object.assign({}, item, pendingChanges);
}

export default getProviderState;
