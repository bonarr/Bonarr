const moment = require('moment');
const UiSettings = require('Shared/UiSettingsModel');

function lts(input) {
  if (!input) {
    return '';
  }

  return moment(input).format(UiSettings.time(true, true));
}

module.exports = lts;
