var Marionette = require('marionette');
var AddSeriesView = require('../AddSeriesView');
var UnmappedFolderCollection = require('./UnmappedFolderCollection');

module.exports = Marionette.CompositeView.extend({
  itemView: AddSeriesView,
  itemViewContainer: '.x-loading-folders',
  template: 'AddSeries/Existing/AddExistingSeriesCollectionViewTemplate',

  ui: {
    loadingFolders: '.x-loading-folders'
  },

  initialize() {
    this.collection = new UnmappedFolderCollection();
    this.collection.importItems(this.model);
  },

  showCollection() {
    this._showAndSearch(0);
  },

  appendHtml(collectionView, itemView, index) {
    collectionView.ui.loadingFolders.before(itemView.el);
  },

  _showAndSearch(index) {
    var self = this;
    var model = this.collection.at(index);

    if (model) {
      var currentIndex = index;
      var folderName = model.get('folder').name;
      this.addItemView(model, this.getItemView(), index);
      this.children.findByModel(model).search({ term: folderName }).always(function() {
        if (!self.isClosed) {
          self._showAndSearch(currentIndex + 1);
        }
      });
    } else {
      this.ui.loadingFolders.hide();
    }
  },

  itemViewOptions: {
    isExisting: true
  }
});