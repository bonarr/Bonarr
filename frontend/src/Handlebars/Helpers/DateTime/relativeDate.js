const handlebars = require('handlebars');
const moment = require('moment');
const UiSettings = require('Shared/UiSettingsModel');
const FormatHelpers = require('Shared/FormatHelpers');

const relativeDate = function(input, options) {
  if (!input) {
    return '';
  }

  var showSeconds = !!options.hash.showSeconds;
  var showSecondsOnTooltip = !!options.hash.showSecondsOnTooltip;
  var date = moment(input);
  var diff = date.diff(moment().zone(date.zone()).startOf('day'), 'days', true);
  var tooltip = date.format(UiSettings.longDateTime(showSecondsOnTooltip));
  var text;

  if (diff > 0 && diff < 1) {
    text = date.format(UiSettings.time(true, showSeconds));
  } else {
    if (UiSettings.get('showRelativeDates')) {
      text = FormatHelpers.relativeDate(input);
    } else {
      text = date.format(UiSettings.get('shortDateFormat'));
    }
  }

  return new handlebars.SafeString(`<span title="${tooltip}">${text}</span>`);
};

module.exports = relativeDate;
