import $ from 'jquery';
import { saving, update, clearPendingChanges, setSaveError } from '../baseActions';

function createSaveHandler(section, url, getFromState) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(saving({ section, saving: true }));

      const state = getFromState(getState());
      const saveData = Object.assign({}, state.item, state.pendingChanges);

      const promise = $.ajax({
        url,
        method: 'PUT',
        dataType: 'json',
        data: JSON.stringify(saveData)
      });

      promise.done((data) => {
        dispatch(update({ section, data }));
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

export default createSaveHandler;
