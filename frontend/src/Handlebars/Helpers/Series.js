var Handlebars = require('handlebars');
var _ = require('underscore');
var titleWithYear = require('./Series/titleWithYear');
var episodeProgressClass = require('./Series/episodeProgressClass');
var route = require('./Series/route');

var placeholderUrl = window.Sonarr.UrlBase + '/Content/Images/poster-dark.png';

function getPosterUrl(images, size) {
  var poster = _.findWhere(images, { coverType: 'poster' });
  if (poster) {
    var url = poster.url;

    // remove protocol.
    url = poster.url.replace(/^https?\:/, '');

    if (size) {
      url = url.replace('poster.jpg', `poster-${size}.jpg`);
    }

    return url;
  }
}

Handlebars.registerHelper('posterHelper', function(size) {
  var parsedSize = parseInt(size, 10);
  var url = getPosterUrl(this.images, parsedSize);

  if (url) {
    const onError = `src="${url}" onerror="window.Sonarr.imageError(this);"`;
    return new Handlebars.SafeString(`<img class="series-poster x-series-poster" ${onError}>`);
  }

  return new Handlebars.SafeString('<img class="series-poster placeholder-image" src="{0}">'.format(placeholderUrl));
});

Handlebars.registerHelper('lazyPosterHelper', function() {
  var url = getPosterUrl(this.images);

  if (url) {
    return new Handlebars.SafeString('<img class="series-poster x-series-poster lazy" src="{0}" data-original="{1}">'.format(placeholderUrl, url));
  }

  return new Handlebars.SafeString('<img class="series-poster placeholder-image" src="{0}">'.format(placeholderUrl));
});

Handlebars.registerHelper('traktUrl', function() {
  return 'http://trakt.tv/show/' + this.titleSlug;
});

Handlebars.registerHelper('imdbUrl', function() {
  return 'http://imdb.com/title/' + this.imdbId;
});

Handlebars.registerHelper('tvdbUrl', function() {
  return 'http://www.thetvdb.com/?tab=series&id=' + this.tvdbId;
});

Handlebars.registerHelper('tvMazeUrl', function() {
  return 'http://www.tvmaze.com/shows/' + this.tvMazeId + '/_';
});

Handlebars.registerHelper('route', route);

Handlebars.registerHelper('percentOfEpisodes', function() {
  var episodeCount = this.episodeCount;
  var episodeFileCount = this.episodeFileCount;

  var percent = 100;

  if (episodeCount > 0) {
    percent = episodeFileCount / episodeCount * 100;
  }

  return percent;
});

Handlebars.registerHelper('seasonCountHelper', function() {
  var seasonCount = this.seasonCount;
  var continuing = this.status === 'continuing';

  if (continuing) {
    return new Handlebars.SafeString('<span class="label label-info">Season {0}</span>'.format(seasonCount));
  }

  if (seasonCount === 1) {
    return new Handlebars.SafeString('<span class="label label-info">1 Season</span>');
  }

  return new Handlebars.SafeString('<span class="label label-info">{0} Seasons</span>'.format(seasonCount));
});

Handlebars.registerHelper('titleWithYear', titleWithYear);
Handlebars.registerHelper('EpisodeProgressClass', episodeProgressClass);
