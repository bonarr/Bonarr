const Handlebars = require('handlebars');

const episodeStatus = function() {
  const title = this.title || 'TBA';

  return new Handlebars.SafeString(`<a href="/episode/${this.id}">${title}</a>`);
};

module.exports = episodeStatus;
