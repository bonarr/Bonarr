const Handlebars = require('handlebars');

function episodeStatus(episode) {
  const title = episode.title || 'TBA';

  return new Handlebars.SafeString(`<a href="/episode/${episode.id}" class="no-router">${title}</a>`);
}

module.exports = episodeStatus;
