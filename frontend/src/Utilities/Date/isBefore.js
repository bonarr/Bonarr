import moment from 'moment';

function isBefore(date) {
  if (!date) {
    return false;
  }

  return moment(date).isBefore(moment());
}

export default isBefore;
