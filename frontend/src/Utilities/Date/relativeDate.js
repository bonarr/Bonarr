import moment from 'moment';
import UiSettings from 'Shared/UiSettingsModel';
import FormatHelpers from 'Shared/FormatHelpers';

function relativeDate(input, options= {}) {
  if (!input) {
    return '';
  }

  const date = moment(input);
  const diff = date.diff(moment().zone(date.zone()).startOf('day'), 'days', true);
  let text = date.format(UiSettings.get('shortDateFormat'));

  if (diff > 0 && diff < 1) {
    text = date.format(UiSettings.time(true, options.showSeconds));
  } else if (UiSettings.get('showRelativeDates')) {
    text = FormatHelpers.relativeDate(input);
  }

  return text;
}

export default relativeDate;
