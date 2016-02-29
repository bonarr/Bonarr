var Handlebars = require('handlebars');
var FormatHelpers = require('Shared/FormatHelpers');
var bytes = require('./Number/bytes');
var number = require('./Number/number');

Handlebars.registerHelper('Bytes', bytes);
Handlebars.registerHelper('Number', number);

Handlebars.registerHelper('Pad2', function (input) {
  return FormatHelpers.pad(input, 2);
});
