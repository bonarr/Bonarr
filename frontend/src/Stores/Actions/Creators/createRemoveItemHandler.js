import $ from 'jquery';
import { set, removeItem } from '../baseActions';

function createRemoveItemHandler(section, url, getFromState) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(set({ section, deleting: true }));

      const {
        id,
        ...queryParms
      } = payload;

      const ajaxOptions = {
        url: `${url}/${id}?${$.param(queryParms, true)}`,
        method: 'DELETE'
      };

      const promise = $.ajax(ajaxOptions);

      promise.done((data) => {
        dispatch(removeItem({ section, id }));

        dispatch(set({
          section,
          deleting: false,
          deleteError: null
        }));
      });

      promise.fail((xhr) => {
        dispatch(set({
          section,
          deleting: false,
          deleteError: xhr
        }));
      });
    };
  };
}

export default createRemoveItemHandler;
