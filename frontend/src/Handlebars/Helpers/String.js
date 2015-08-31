var Handlebars = require('handlebars');

Handlebars.registerHelper('TitleCase', function(input) {
  return new Handlebars.SafeString(input.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  }));
});

var elipsis = function(value, len) {
  if (value && value.length > len) {
    var vs = value.substr(0, len - 2),
      index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'));
    if (index !== -1 && index >= (len - 15)) {
      return vs.substr(0, index) + "...";
    }
    return value.substr(0, len - 3) + "...";
  }
  return value;
};

Handlebars.registerHelper('EllipsisHelper', function(input, length) {
  var result = elipsis(input, length);
  return new Handlebars.SafeString(result);
});

