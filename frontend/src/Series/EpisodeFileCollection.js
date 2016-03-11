var Backbone = require('backbone');
var EpisodeFileModel = require('./EpisodeFileModel');

module.exports = Backbone.Collection.extend({
  url: window.Sonarr.ApiRoot + '/episodefile',
  model: EpisodeFileModel,

  originalFetch: Backbone.Collection.prototype.fetch,

  initialize(options) {
    this.seriesId = options.seriesId;
    this.models = [];
  },

  fetch(options) {
    if (!this.seriesId) {
      throw 'seriesId is required';
    }

    if (!options) {
      options = {};
    }

    options.data = { seriesId: this.seriesId };

    return this.originalFetch.call(this, options);
  }
});
