const moment = require('moment');
const UiSettings = require('Shared/UiSettingsModel');

function shortDate(input) {
  if (!input) {
    return '';
  }

  const date = moment(input);

  return date.format(UiSettings.get('shortDateFormat'));
}

module.exports = shortDate;
