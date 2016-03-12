const Handlebars = require('handlebars');

function titleWithYear() {
  if (!this.year || this.title.endsWith(` (${this.year})`)) {
    return this.title;
  }

  return new Handlebars.SafeString(`${this.title} <span class="year">(${this.year})</span>`);
}

module.exports = titleWithYear;
