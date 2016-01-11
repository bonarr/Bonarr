var _ = require('underscore');

module.exports = function() {

  this.prototype.getSelectedModels = function () {
    return _.where(this.models, { selected: true });
  };

  this.prototype.selectAllModels = function () {
    this.models.forEach((model) => {
      model.selected = true;
      model.trigger('select', model, true);
    });
  };

  this.prototype.unselectAllModels = function () {
    this.models.forEach((model) => {
      model.selected = false;
      model.trigger('select', model, false);
    });
  };

  return this;
};
