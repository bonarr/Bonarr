import moment from 'moment';
import UiSettings from 'Shared/UiSettingsModel';

function longDateTime(input, options = {}) {
  if (!input) {
    return '';
  }

  const date = moment(input);
  return date.format(UiSettings.longDateTime(options.includeSeconds));
}

export default longDateTime;
