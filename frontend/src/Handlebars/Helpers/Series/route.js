function route() {
  return `${window.Sonarr.UrlBase}/series/${this.titleSlug}`;
}

module.exports = route;
