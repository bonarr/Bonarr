var Handlebars = require('handlebars');
var StatusModel = require('../../System/StatusModel');
var _ = require('underscore');

var placeholderUrl = StatusModel.get('urlBase') + '/Content/Images/poster-dark.png';

function defaultImage(url, size) {
  if (!url) {
    return new Handlebars.SafeString('onerror="window.Sonarr.imageError(this);"');
  }
  if (size) {
    url = url.replace(/\.jpg($|\?)/g, '-' + size + '.jpg$1');
  }
  return new Handlebars.SafeString('src="{0}" onerror="window.Sonarr.imageError(this);"'.format(url));
}

function getPosterUrl(images, size) {
  var poster = _.findWhere(images, { coverType: 'poster' });
  if (poster) {
    var url = poster.url;

    //remove protocol.
    if (poster.url.match(/^https?:\/\//)) {
      url = poster.url.replace(/^https?\:/, '');
    }

    if (size) {
      url = url.replace('poster.jpg', 'poster-' + size + '.jpg');
    }

    return url;
  }
}

Handlebars.registerHelper('posterHelper', function(size) {
  var size = parseInt(size, 10)
  var url = getPosterUrl(this.images, size);

  if (url) {
    return new Handlebars.SafeString('<img class="series-poster x-series-poster" {0}>'.format(defaultImage(url)));
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

Handlebars.registerHelper('tvRageUrl', function() {
  return 'http://www.tvrage.com/shows/id-' + this.tvRageId;
});

Handlebars.registerHelper('tvMazeUrl', function() {
  return 'http://www.tvmaze.com/shows/' + this.tvMazeId + '/_';
});

Handlebars.registerHelper('route', function() {
  return StatusModel.get('urlBase') + '/series/' + this.titleSlug;
});

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
    return new Handlebars.SafeString('<span class="label label-info">{0} Season</span>'.format(seasonCount));
  }

  return new Handlebars.SafeString('<span class="label label-info">{0} Seasons</span>'.format(seasonCount));
});

Handlebars.registerHelper('titleWithYear', function() {
  if (this.title.endsWith(' ({0})'.format(this.year))) {
    return this.title;
  }

  if (!this.year) {
    return this.title;
  }

  return new Handlebars.SafeString('{0} <span class="year">({1})</span>'.format(this.title, this.year));
});
