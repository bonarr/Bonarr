const Marionette = require('marionette');
const _ = require('underscore');
const tpl = require('./SeriesHeaderView.hbs');

module.exports = Marionette.ItemView.extend({
  template: tpl,

  ui: {
    backdrop: '.backdrop'
  },

  events: {
    'click .x-previous': 'onPreviousClick',
    'click .x-next': 'onNextClick'
  },

  initialize(options) {
    this.episodeFileCollection = options.episodeFileCollection;

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.episodeFileCollection, 'sync', this.render);
  },

  templateHelpers() {
    const collection = this.model.collection;
    const index = collection.indexOf(this.model);
    const previousSeries = index > 0 ? collection.at(index - 1) : collection.last();
    const nextSeries = index < collection.length - 1 ? collection.at(index + 1) : collection.first();

    return {
      fileCount: this.episodeFileCollection.length,
      previousSeriesUrl: previousSeries.getRoute(),
      nextSeriesUrl: nextSeries.getRoute()
    };
  },

  onRender() {
    const fanArt = _.findWhere(this.model.get('images'), { coverType: 'fanart' });
    if (fanArt) {
      this.ui.backdrop.css({ 'background-image': `url("${fanArt.url}")` });
    }
  }
});
