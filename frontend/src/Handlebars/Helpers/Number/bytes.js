const Handlebars = require('handlebars');
const FormatHelpers = require('Shared/FormatHelpers');

const bytes = function(input) {
  return new Handlebars.SafeString(FormatHelpers.bytes(input));
};

module.exports = bytes;
