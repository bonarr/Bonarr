import $ from 'jquery';
import getProviderState from 'Utilities/State/getProviderState';
import { set, updateProvider } from '../baseActions';

function createTestProviderHandler(section, url, getFromState) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(set({ section, testing: true }));

      const testData = getProviderState(payload, getState, getFromState);

      const ajaxOptions = {
        url: `${url}/test`,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(testData)
      };

      const promise = $.ajax(ajaxOptions);

      promise.done((data) => {
        dispatch(updateProvider({ section, data }));

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
