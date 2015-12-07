var Marionette = require('marionette');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
  template: 'Series/Details/SeriesHeaderView',

  ui: {
    backdrop: '.backdrop'
  },

  initialize(options) {
    this.episodeFileCollection = options.episodeFileCollection;

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.episodeFileCollection, 'sync', this.render);
  },

  templateHelpers() {
    return {
      fileCount: this.episodeFileCollection.length
    };
  },

  onRender() {
    const fanArt = _.findWhere(this.model.get('images'), { coverType: 'fanart' });
    if (fanArt) {
      this.ui.backdrop.css({ 'background-image': 'url("' + fanArt.url + '")' });
    }
  }
});
