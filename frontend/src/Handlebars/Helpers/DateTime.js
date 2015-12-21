var Handlebars = require('handlebars');
var moment = require('moment');
var UiSettings = require('Shared/UiSettingsModel');
var relativeHelepr = require('./DateTime/relativeDate');

Handlebars.registerHelper('ShortDate', function(input) {
  if (!input) {
    return '';
  }

  var date = moment(input);
  var result = '<span title="' + date.format(UiSettings.longDateTime()) + '">' + date.format(UiSettings.get('shortDateFormat')) + '</span>';

  return new Handlebars.SafeString(result);
});

Handlebars.registerHelper('RelativeDate', relativeHelepr);

Handlebars.registerHelper('Day', function(input) {
  if (!input) {
    return '';
  }

  return moment(input).format('DD');
});

Handlebars.registerHelper('Month', function(input) {
  if (!input) {
    return '';
  }

  return moment(input).format('MMM');
});

Handlebars.registerHelper('StartTime', function(input) {
  if (!input) {
    return '';
  }

  var time = moment(input);
  var includeMinutes = time.get('minutes') !== 0;

  return time.format(UiSettings.time(includeMinutes, false));
});

Handlebars.registerHelper('LTS', function(input) {
  if (!input) {
    return '';
  }

  return moment(input).format(UiSettings.time(true, true));
});

Handlebars.registerHelper('FormatDate', function(input, options) {
  if (!input || !options.hash.format) {
    return '';
  }

  return moment(input).format(options.hash.format);
});

Handlebars.registerHelper('if_today', function(context, options) {
  var date = moment(context).startOf('day');
  var today = moment().startOf('day');

  if (date.isSame(today)) {
    return options.fn(this);
  }

  return options.inverse(this);
});

Handlebars.registerHelper('unless_today', function(context, options) {
  var date = moment(context).startOf('day');
  var today = moment().startOf('day');

  if (date.isSame(today)) {
    return options.inverse(this);
  }

  return options.fn(this);
});
