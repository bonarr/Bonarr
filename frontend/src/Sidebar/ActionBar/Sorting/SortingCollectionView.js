const Marionette = require('marionette');
const SortingView = require('./SortingView');
const tpl = require('./SortingCollectionView.hbs');

module.exports = Marionette.CompositeView.extend({
  childView: SortingView,
  template: tpl,
  childViewContainer: '.x-sorting-list',

  initialize(options) {
    this.viewCollection = options.viewCollection;
    this.listenTo(this.viewCollection, 'drone:sort', this.sort);
  },

  childViewOptions() {
    return {
      viewCollection: this.viewCollection
    };
  },

  sort(sortModel, sortDirection) {
    const collection = this.viewCollection;

    let order = null;
    if (sortDirection === 'ascending') {
      order = -1;
    } else if (sortDirection === 'descending') {
      order = 1;
    }

    collection.setSorting(sortModel.get('name'), order);
    collection.fullCollection.sort();

    return this;
  }
});
