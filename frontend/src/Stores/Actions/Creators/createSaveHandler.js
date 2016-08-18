import $ from 'jquery';
import { saving, update, clearPendingChanges, setSaveError } from '../baseActions';

function getPendingChangesPropertyName(property) {
  return `${property}PendingChanges`;
}

function createSaveHandler(property, url, getFromState) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(saving({ property, fetching: true }));

      const state = getFromState(getState());
      const saveData = Object.assign({}, state[property], state[getPendingChangesPropertyName(property)]);

      const promise = $.ajax({
        url,
        method: 'PUT',
        dataType: 'json',
        data: JSON.stringify(saveData)
      });

      promise.done((data) => {
        dispatch(update({ property, data }));
        dispatch(clearPendingChanges({ property }));
        dispatch(setSaveError({ property, error: null }));
      });

      promise.fail((xhr) => {
        dispatch(setSaveError({ property, error: xhr }));
      });

      promise.always(() => {
        dispatch(saving({ property, fetching: false }));
      });
    };
  };
}

export default createSaveHandler;
