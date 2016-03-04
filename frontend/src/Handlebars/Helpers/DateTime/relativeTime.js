const handlebars = require('handlebars');
const moment = require('moment');
const UiSettings = require('Shared/UiSettingsModel');
const FormatHelpers = require('Shared/FormatHelpers');

const relativeDate = function(input, options) {
  if (!input) {
    return '';
  }

  var showSecondsOnTooltip = !!options.hash.showSecondsOnTooltip;
  var date = moment(input);
  var tooltip = date.format(UiSettings.longDateTime(showSecondsOnTooltip));
  var text;

  if (UiSettings.get('showRelativeDates')) {
    text = date.fromNow();
  } else {
    text = date.format(UiSettings.get('shortDateTime'));
  }

  return new handlebars.SafeString(`<span title="${tooltip}">${text}</span>`);
};

module.exports = relativeDate;
