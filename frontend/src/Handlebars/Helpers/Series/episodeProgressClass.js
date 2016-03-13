function episodeProgressClass() {
  if (this.episodeFileCount === this.episodeCount) {
    if (this.status === 'continuing') {
      return '';
    }

    return 'progress-bar-success';
  }

  if (this.monitored) {
    return 'progress-bar-danger';
  }

  return 'progress-bar-warning';
}

module.exports = episodeProgressClass;
