const handlebars = require('handlebars');
const moment = require('moment');
const FormatHelpers = require('Shared/FormatHelpers');

function episodeNumber() {
  const seasonNumber = this.seasonNumber;
  const paddedEpisodeNumber = FormatHelpers.pad(this.episodeNumber, 2);
  const absoluteEpisodeNumber = FormatHelpers.pad(this.absoluteEpisodeNumber, 2);

  if (this.series.seriesType === 'daily') {
    return moment(this.airDate).format('L');
  } else if (this.series.seriesType === 'anime' && absoluteEpisodeNumber !== undefined) {
    return `${seasonNumber}x${paddedEpisodeNumber} (${absoluteEpisodeNumber})`;
  }

  return `${seasonNumber}x${paddedEpisodeNumber}`;
}

module.exports = episodeNumber;
