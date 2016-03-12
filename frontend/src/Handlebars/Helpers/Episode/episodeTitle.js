const Handlebars = require('handlebars');

function episodeStatus() {
  const title = this.title || 'TBA';

  return new Handlebars.SafeString(`<a href="/episode/${this.id}" class="no-router">${title}</a>`);
}

module.exports = episodeStatus;
