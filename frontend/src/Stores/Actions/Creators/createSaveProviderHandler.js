import $ from 'jquery';
import getProviderState from 'Utilities/State/getProviderState';
import { set, updateThingy } from '../baseActions';

function createSaveProviderHandler(section, providerSection, url, getFromState, getProvidersFromState) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(set({ section, saving: true }));

      const id = payload.id;
      const saveData = getProviderState(payload, getState, getFromState, getProvidersFromState);

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
        dispatch(updateThingy({ section: providerSection, data }));

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

export default createSaveProviderHandler;
