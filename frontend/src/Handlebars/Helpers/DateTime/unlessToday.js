const moment = require('moment');

function unlessToday(context, options) {
  const date = moment(context).startOf('day');
  const today = moment().startOf('day');

  if (date.isSame(today)) {
    return options.inverse(this);
  }

  return options.fn(this);
}

module.exports = unlessToday;
