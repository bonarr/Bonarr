import moment from 'moment';

function isTomrrow(date) {
  if (!date) {
    return false;
  }

  return moment(date).add(1, 'day').isSame(moment(), 'day');
}

export default isTomrrow;
