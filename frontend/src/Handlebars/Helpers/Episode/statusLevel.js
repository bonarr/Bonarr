const moment = require('moment');
const queueCollection = require('Activity/Queue/QueueCollection');

function statusLevel() {
  const hasFile = this.hasFile;
  const downloading = queueCollection.findEpisode(this.id) || this.downloading;
  const currentTime = moment();
  const start = moment(this.airDateUtc);
  const end = moment(this.end);
  const monitored = this.series.monitored && this.monitored;

  if (hasFile) {
    return 'success';
  }

  if (downloading) {
    return 'purple';
  } else if (!monitored) {
    return 'unmonitored';
  }

  if (this.episodeNumber === 1) {
    return 'premiere';
  }

  if (currentTime.isAfter(start) && currentTime.isBefore(end)) {
    return 'warning';
  }

  if (start.isBefore(currentTime) && !hasFile) {
    return 'danger';
  }

  return 'primary';
}

module.exports = statusLevel;
