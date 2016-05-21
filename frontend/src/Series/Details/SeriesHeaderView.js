const Marionette = require('marionette');
const _ = require('underscore');
const tpl = require('./SeriesHeaderView.hbs');

const SeriesHeaderView = Marionette.ItemView.extend({
  template: tpl,

  ui: {
    backdrop: '.backdrop'
  },

  events: {
    'click .x-previous': 'onPreviousClick',
    'click .x-next': 'onNextClick'
  },

  initialize() {
    this.listenTo(this.model, 'change', this.render);
  },

  templateHelpers() {
    const previousSeries = this.model.previousSeries();
    const nextSeries = this.model.nextSeries();

    return {
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

module.exports = SeriesHeaderView;
