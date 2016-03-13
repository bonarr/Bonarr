const moment = require('moment');

function ifToday(context, options) {
  const date = moment(context).startOf('day');
  const today = moment().startOf('day');

  if (date.isSame(today)) {
    return options.fn(this);
  }

  return options.inverse(this);
}

module.exports = ifToday;
