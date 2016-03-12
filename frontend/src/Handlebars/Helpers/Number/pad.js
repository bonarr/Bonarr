const FormatHelpers = require('Shared/FormatHelpers');

function pad(input, options) {
  const length = options.hash.length;
  return FormatHelpers.number(input, length);
}

module.exports = pad;
