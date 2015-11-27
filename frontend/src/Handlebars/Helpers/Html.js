var $ = require('jquery');
var Handlebars = require('handlebars');

var placeholder = window.Sonarr.UrlBase + '/Content/Images/poster-dark.png';

window.Sonarr.imageError = function(img) {
  if (!img.src.contains(placeholder)) {
    img.src = placeholder;
    $(img).addClass('placeholder-image');
  }

  img.onerror = null;
};

Handlebars.registerHelper('defaultImg', function(src, size) {
  if (!src) {
    return new Handlebars.SafeString('onerror="window.Sonarr.imageError(this);"');
  }

  if (size) {
    src = src.replace(/\.jpg($|\?)/g, '-' + size + '.jpg$1');
  }

  return new Handlebars.SafeString(`src="${src}" onerror="window.Sonarr.imageError(this);`);
});

Handlebars.registerHelper('UrlBase', function() {
  return new Handlebars.SafeString(window.Sonarr.UrlBase);
});
