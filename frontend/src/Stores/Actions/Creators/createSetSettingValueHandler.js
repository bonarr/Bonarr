import { setSettingValue } from '../baseActions';

function createSetSettingValueHandler(property, url) {
  return function(payload) {
    return function(dispatch, getState) {
      const { name, value } = payload;

      dispatch(setSettingValue({ property, name, value }));
    };
  };
}

export default createSetSettingValueHandler;
