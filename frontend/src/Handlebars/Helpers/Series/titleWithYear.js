const Handlebars = require('handlebars');

const titleWithYeary = function() {
  if (!this.year || this.title.endsWith(` (${this.year})`)) {
    return this.title;
  }

  return new Handlebars.SafeString(`${this.title} <span class="year">(${this.year})</span>`);
};

module.exports = titleWithYeary;
