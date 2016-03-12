const handlebars = require('handlebars');
const moment = require('moment');
const UiSettings = require('Shared/UiSettingsModel');

function relativeTime(input, options) {
  if (!input) {
    return '';
  }

  const showSecondsOnTooltip = !!options.hash.showSecondsOnTooltip;
  const date = moment(input);
  const tooltip = date.format(UiSettings.longDateTime(showSecondsOnTooltip));
  const text = UiSettings.get('showRelativeDates') ? date.fromNow() : date.format(UiSettings.get('shortDateTime'));

  return new handlebars.SafeString(`<span title="${tooltip}">${text}</span>`);
}

module.exports = relativeTime;
