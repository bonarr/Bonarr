import $ from 'jquery';
import _ from 'lodash';
import { saving, updateThingy, clearPendingChanges, setSaveError } from '../baseActions';

function createSaveThingyHandler(section, thingySection, url, getFromState, getThingiesFromState) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(saving({ section, saving: true }));

      const id = payload.id;
      const state = getFromState(getState());
      const thingiesState = getThingiesFromState(getState());
      const saveData = Object.assign({}, id ? _.find(thingiesState.items, { id }) : state.item, state.pendingChanges);

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
        dispatch(clearPendingChanges({ section }));
        dispatch(setSaveError({ section, saveError: null }));
      });

      promise.fail((xhr) => {
        dispatch(setSaveError({ section, saveError: xhr }));
      });

      promise.always(() => {
        dispatch(saving({ section, saving: false }));
      });
    };
  };
}

export default createSaveThingyHandler;
