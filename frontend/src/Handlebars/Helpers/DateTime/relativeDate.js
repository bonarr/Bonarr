const handlebars = require('handlebars');
const moment = require('moment');
const UiSettings = require('../../../Shared/UiSettingsModel');
const FormatHelpers = require('../../../Shared/FormatHelpers');

const relativeDate = function(input) {
  if (!input) {
    return '';
  }

  var date = moment(input);
  var tooltip = date.format(UiSettings.longDateTime());
  var text;

  if (UiSettings.get('showRelativeDates')) {
    text = FormatHelpers.relativeDate(input);
  } else {
    text = date.format(UiSettings.get('shortDateFormat'));
  }

  var result = `<span title="${tooltip}">${text}</span>`;

  return new handlebars.SafeString(result);
};


module.exports = relativeDate;
