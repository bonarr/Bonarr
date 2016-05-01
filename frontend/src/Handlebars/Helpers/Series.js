const Handlebars = require('handlebars');
const titleWithYear = require('./Series/titleWithYear');
const episodeProgressClass = require('./Series/episodeProgressClass');
const route = require('./Series/route');

Handlebars.registerHelper('route', route);

Handlebars.registerHelper('percentOfEpisodes', function() {
  const episodeCount = this.episodeCount;
  const episodeFileCount = this.episodeFileCount;

  let percent = 100;

  if (episodeCount > 0) {
    percent = episodeFileCount / episodeCount * 100;
  }

  return percent;
});

Handlebars.registerHelper('seasonCountHelper', function() {
  const seasonCount = this.seasonCount;
  const continuing = this.status === 'continuing';

  if (continuing) {
    return new Handlebars.SafeString('<span class="label label-info">Season {0}</span>'.format(seasonCount));
  }

  if (seasonCount === 1) {
    return new Handlebars.SafeString('<span class="label label-info">1 Season</span>');
  }

  return new Handlebars.SafeString('<span class="label label-info">{0} Seasons</span>'.format(seasonCount));
});

Handlebars.registerHelper('titleWithYear', titleWithYear);
Handlebars.registerHelper('episodeProgressClass', episodeProgressClass);
