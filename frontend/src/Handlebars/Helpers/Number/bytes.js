const Handlebars = require('handlebars');
const FormatHelpers = require('Shared/FormatHelpers');

const bytes = function(input, options) {
  return new Handlebars.SafeString(FormatHelpers.bytes(input));
};

module.exports = bytes;
