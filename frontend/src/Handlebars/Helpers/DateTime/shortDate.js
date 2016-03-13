const handlebars = require('handlebars');
const moment = require('moment');
const UiSettings = require('Shared/UiSettingsModel');

function shortDate(input) {
  if (!input) {
    return '';
  }

  const date = moment(input);
  const tooltip = date.format(UiSettings.longDateTime());
  const text = date.format(UiSettings.get('shortDateFormat'));

  return new handlebars.SafeString(`<span title="${tooltip}">${text}</span>`);
}

module.exports = shortDate;
