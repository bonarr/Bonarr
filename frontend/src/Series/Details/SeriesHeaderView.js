var Marionette = require('marionette');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
  template: 'Series/Details/SeriesHeaderView',

  ui: {
    backdrop: '.backdrop'
  },

  initialize: function(options) {
    this.episodeFileCollection = options.episodeFileCollection;

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.episodeFileCollection, 'sync', this.render);
  },

  onRender: function() {
    var fanArt = _.findWhere(this.model.get('images'), {coverType: 'fanart'});
    this.ui.backdrop.css({'background-image': 'url("' + fanArt.url + '")'});
  },

  templateHelpers: function() {
    return {
      fileCount: this.episodeFileCollection.length
    };
  }
});