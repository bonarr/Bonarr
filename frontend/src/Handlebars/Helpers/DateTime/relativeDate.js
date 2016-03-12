const handlebars = require('handlebars');
const moment = require('moment');
const UiSettings = require('Shared/UiSettingsModel');
const FormatHelpers = require('Shared/FormatHelpers');

function relativeDate(input, options) {
  if (!input) {
    return '';
  }

  const showSeconds = !!options.hash.showSeconds;
  const showSecondsOnTooltip = !!options.hash.showSecondsOnTooltip;
  const date = moment(input);
  const diff = date.diff(moment().zone(date.zone()).startOf('day'), 'days', true);
  const tooltip = date.format(UiSettings.longDateTime(showSecondsOnTooltip));
  let text = date.format(UiSettings.get('shortDateFormat'));

  if (diff > 0 && diff < 1) {
    text = date.format(UiSettings.time(true, showSeconds));
  } else if (UiSettings.get('showRelativeDates')) {
    text = FormatHelpers.relativeDate(input);
  }

  return new handlebars.SafeString(`<span title="${tooltip}">${text}</span>`);
}

module.exports = relativeDate;
