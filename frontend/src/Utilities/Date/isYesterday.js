import moment from 'moment';

function isYesterday(date) {
  if (!date) {
    return false;
  }

  return moment(date).subtract(1, 'day').isSame(moment(), 'day');
}

export default isYesterday;
