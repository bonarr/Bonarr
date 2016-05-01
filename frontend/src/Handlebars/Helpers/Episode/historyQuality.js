const handlebars = require('handlebars');

function historyQuality(quality) {
  if (quality.revision.version > 1) {
    return new handlebars.SafeString(`<span class="badge badge-info" title="PROPER">${quality.quality.name}</span>`);
  }

  return new handlebars.SafeString(`<span class="badge">${quality.quality.name}</span>`);
}

module.exports = historyQuality;
