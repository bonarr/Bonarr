import $ from 'jquery';
import _ from 'lodash';
import { set, updateThingy } from '../baseActions';

function createSaveThingyHandler(section, thingySection, url, getFromState, getThingiesFromState) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(set({ section, saving: true }));

      const id = payload.id;
      const state = getFromState(getState());
      const thingiesState = getThingiesFromState(getState());
      const pendingChanges = Object.assign({}, state.pendingChanges);
      const pendingFields = state.pendingChanges.fields || {};
      delete pendingChanges.fields;

      const item = id ? _.find(thingiesState.items, { id }) : state.item;

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

      const saveData = Object.assign({}, item, pendingChanges);

      const ajaxOptions = {
        url,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(saveData)
      };

      if (id) {
        ajaxOptions.url = `${url}/${id}`;
        ajaxOptions.method = 'PUT';
      }

      const promise = $.ajax(ajaxOptions);

      promise.done((data) => {
        dispatch(updateThingy({ section: thingySection, data }));

        dispatch(set({
          section,
          saving: false,
          saveError: null,
          pendingChanges: {}
        }));
      });

      promise.fail((xhr) => {
        dispatch(set({
          section,
          saving: false,
          saveError: xhr
        }));
      });
    };
  };
}

export default createSaveThingyHandler;
