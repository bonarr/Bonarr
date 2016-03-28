module.exports = function() {
  this.prototype.appendHtml = function(collectionView, childView, index) {
    var childrenContainer = collectionView.childViewContainer ? collectionView.$(collectionView.childViewContainer) : collectionView.$el;
    var collection = collectionView.collection;

    // If the index of the model is at the end of the collection append, else insert at proper index
    if (index >= collection.size() - 1) {
      childrenContainer.append(childView.el);
    } else {
      var previousModel = collection.at(index + 1);
      var previousView = this.children.findByModel(previousModel);

      if (previousView) {
        previousView.$el.before(childView.$el);
      } else {
        childrenContainer.append(childView.el);
      }
    }
  };

  return this;
};
