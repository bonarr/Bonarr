const Handlebars = require('handlebars');
const FormatHelpers = require('Shared/FormatHelpers');

function bytes(input) {
  return new Handlebars.SafeString(FormatHelpers.bytes(input));
}

module.exports = bytes;
