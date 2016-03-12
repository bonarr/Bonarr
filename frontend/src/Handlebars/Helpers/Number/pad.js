const FormatHelpers = require('Shared/FormatHelpers');

const pad = function(input, options) {
  const length = options.hash.length;
  return FormatHelpers.number(input, length);
};

module.exports = pad;
