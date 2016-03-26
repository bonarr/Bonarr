const moment = require('moment');
const FormatHelpers = require('Shared/FormatHelpers');
const seriesCollection = require('Series/SeriesCollection');

function episodeNumber() {
  const series = seriesCollection.get(this.seriesId);
  const seriesType = series.get('seriesType');

  if (seriesType === 'daily') {
    return moment(this.airDate).format('L');
  }

  const seasonNumber = this.seasonNumber;
  const paddedEpisodeNumber = FormatHelpers.pad(this.episodeNumber, 2);
  const absoluteEpisodeNumber = FormatHelpers.pad(this.absoluteEpisodeNumber, 2);

  let number = `${seasonNumber}x${paddedEpisodeNumber}`;

  if (seriesType === 'anime' && absoluteEpisodeNumber !== undefined) {
    number = number += ` (${absoluteEpisodeNumber})`;
  }

  return number;
}

module.exports = episodeNumber;
