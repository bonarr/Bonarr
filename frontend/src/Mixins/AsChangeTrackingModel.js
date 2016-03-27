function AsChangeTrackingModel() {
  var originalInit = this.prototype.initialize;

  this.prototype.initialize = function() {
    this.isSaved = true;

    this.on('change', () => {
      this.isSaved = false;
    }, this);

    this.on('sync', () => {
      this.isSaved = true;
    }, this);

    if (originalInit) {
      originalInit.call(this);
    }
  };

  return this;
}

module.exports = AsChangeTrackingModel;
