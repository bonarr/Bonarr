module.exports = function() {

  this.prototype.isFiltered = false;

  this.prototype.filter = function(filters) {
    if (this.isFiltered) {
      return this.sourceCollection.filter(filters);
    }

    var filteredCollection = new this.prototype();
    filteredCollection.isFiltered = true;
    filteredCollection.sourceCollection = this;
    return filteredCollection;
  };

  return this;
};
