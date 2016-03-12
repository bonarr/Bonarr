const moment = require('moment');
const UiSettings = require('Shared/UiSettingsModel');

function startTime(input) {
  if (!input) {
    return '';
  }

  var time = moment(input);
  var includeMinutes = time.get('minutes') !== 0;

  return time.format(UiSettings.time(includeMinutes, false));
}

module.exports = startTime;
