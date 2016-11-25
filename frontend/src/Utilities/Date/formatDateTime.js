import moment from 'moment';
import formatTime from './formatTime';

function formatDateTime(date, dateFormat, timeFormat, { includeSeconds = false } = {}) {
  if (!date) {
    return false;
  }

  const time = formatTime(date, timeFormat, { includeMinuteZero: true, includeSeconds });

  return `${moment(date).format(dateFormat)} ${time}`;
}

export default formatDateTime;
