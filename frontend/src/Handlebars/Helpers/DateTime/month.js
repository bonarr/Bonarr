const moment = require('moment');

function month(input) {
  if (!input) {
    return '';
  }

  return moment(input).format('MMM');
}

module.exports = month;
