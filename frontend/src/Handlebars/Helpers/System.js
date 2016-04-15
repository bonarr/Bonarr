var Handlebars = require('handlebars');
var statusModel = require('System/statusModel');

Handlebars.registerHelper('if_windows', function(options) {
  if (statusModel.get('isWindows')) {
    return options.fn(this);
  }

  return options.inverse(this);
});

Handlebars.registerHelper('if_mono', function(options) {
  if (statusModel.get('isMono')) {
    return options.fn(this);
  }

  return options.inverse(this);
});
