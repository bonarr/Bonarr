const Backbone = require('backbone');
const EpisodeFileModel = require('./EpisodeFileModel');

module.exports = Backbone.Collection.extend({
  url: '/episodefile',
  model: EpisodeFileModel,

  originalFetch: Backbone.Collection.prototype.fetch,

  initialize(options) {
    this.seriesId = options.seriesId;
  },

  fetch(options = {}) {
    const seriesId = this.seriesId;
    if (!seriesId) {
      throw new Error('seriesId is required');
    }

    options.data = { seriesId };
    return this.originalFetch(options);
  }
});
