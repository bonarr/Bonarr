const Handlebars = require('handlebars');

const episodeStatus = function() {
  const title = this.title || 'TBA';

  return new Handlebars.SafeString(`<a href="/episode/${this.id}" class="no-router">${title}</a>`);
};

module.exports = episodeStatus;
