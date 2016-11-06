import $ from 'jquery';
import getProviderState from 'Utilities/State/getProviderState';
import { set, updateProvider } from '../baseActions';

function createTestProviderHandler(section, providerSection, url, getFromState, getProvidersFromState) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(set({ section, testing: true }));

      const testData = getProviderState(payload, getState, getFromState, getProvidersFromState);

      const ajaxOptions = {
        url: `${url}/test`,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(testData)
      };

      const promise = $.ajax(ajaxOptions);

      promise.done((data) => {
        dispatch(updateProvider({ section: providerSection, data }));

        dispatch(set({
          section,
          testing: false,
          saveError: null
        }));
      });

      promise.fail((xhr) => {
        dispatch(set({
          section,
          testing: false,
          saveError: xhr
        }));
      });
    };
  };
}

export default createTestProviderHandler;
