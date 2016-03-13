const moment = require('moment');

function formatDate(input, options) {
  if (!input || !options.hash.format) {
    return '';
  }

  return moment(input).format(options.hash.format);
}

module.exports = formatDate;
