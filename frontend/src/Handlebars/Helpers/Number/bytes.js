const handlebars = require('handlebars');
const FormatHelpers = require('Shared/FormatHelpers');

const bytes = function(input, options) {
  return new Handlebars.SafeString(FormatHelpers.bytes(size));
};

module.exports = bytes;
