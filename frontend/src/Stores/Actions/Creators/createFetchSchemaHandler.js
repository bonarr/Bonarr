import $ from 'jquery';
import { set } from '../baseActions';

function createFetchSchemaHandler(section, url) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(set({ section, fetchingSchema: true }));

      const promise = $.ajax({
        url
      });

      promise.done((data) => {
        dispatch(set({
          section,
          fetchingSchema: false,
          schemaPopulated: true,
          schemaError: null,
          schema: data
        }));
      });

      promise.fail((xhr) => {
        dispatch(set({
          section,
          fetchingSchema: false,
          schemaPopulated: true,
          schemaError: xhr
        }));
      });
    };
  };
}

export default createFetchSchemaHandler;
