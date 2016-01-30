var Marionette = require('marionette');
var SearchResultView = require('./SearchResultView');

module.exports = Marionette.CollectionView.extend({
  itemView: SearchResultView,

  initialize(options) {
    this.isExisting = options.isExisting;
    this.showing = 1;
  },

  showAll() {
    this.showingAll = true;
    this.render();
  },

  showMore() {
    this.showing += 5;
    this.render();

    return this.showing >= this.collection.length;
  },

  appendHtml(collectionView, itemView, index) {
    if (!this.isExisting || index < this.showing || index === 0) {
      collectionView.$el.append(itemView.el);
    }
  }
});