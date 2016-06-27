import moment  from 'moment';
import UiSettings from 'Shared/UiSettingsModel';

function relativeTime(input) {
  if (!input) {
    return '';
  }

  const date = moment(input);

  return UiSettings.get('showRelativeDates') ?
         date.fromNow() :
         date.format(UiSettings.get('shortDateTime'));
}

export default relativeTime;
