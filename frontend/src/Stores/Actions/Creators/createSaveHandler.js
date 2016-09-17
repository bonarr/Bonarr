import $ from 'jquery';
import { set, update } from '../baseActions';

function createSaveHandler(section, url, getFromState) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(set({ section, saving: true }));

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

export default createSaveHandler;
