const moment = require('moment');

function day(input) {
  if (!input) {
    return '';
  }

  return moment(input).format('DD');
}

module.exports = day;
