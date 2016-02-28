const Handlebars = require('handlebars');

const episodeStatus = function() {
  if (!this.year || this.title.endsWith(` (${this.year})`)) {
    return this.title;
  }

  return new Handlebars.SafeString(`test`);
};

module.exports = episodeStatus;
