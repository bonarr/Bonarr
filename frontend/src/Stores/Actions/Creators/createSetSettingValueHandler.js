import { setSettingValue } from '../baseActions';

function createSetSettingValueHandler(section, url) {
  return function(payload) {
    return function(dispatch, getState) {
      const { name, value } = payload;

      dispatch(setSettingValue({ section, name, value }));
    };
  };
}

export default createSetSettingValueHandler;
