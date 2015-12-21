const Handlebars = require('handlebars');
const _ = require('underscore');

const placeholderUrl = window.Sonarr.UrlBase + '/Content/Images/poster-dark.png';

function getPosterUrl(images, size) {
  var poster = _.findWhere(images, { coverType: 'poster' });
  if (poster) {
    // remove protocol.
    var url = poster.url.replace(/^https?\:/, '');
    if (size) {
      url = url.replace('poster.jpg', `poster-${size}.jpg`);
    }
    return url;
  }
}

const poster = function(options) {
  const lazy = options.hash.lazy;
  const size = options.hash.size;
  const url = getPosterUrl(this.images, size);

  if (url) {
    if (lazy) {
      return new Handlebars.SafeString(`<img class="series-poster x-series-poster lazy" src="${placeholderUrl}" data-original="${url}">`);
    } else {
      const  onError = `src="${url}" onerror="window.Sonarr.imageError(this);"`;
      return new Handlebars.SafeString(`<img class="series-poster x-series-poster" ${onError}>`);
    }
  }

  return new Handlebars.SafeString(`<img class="series-poster placeholder-image" src="${placeholderUrl}">`);
};

module.exports = poster;
