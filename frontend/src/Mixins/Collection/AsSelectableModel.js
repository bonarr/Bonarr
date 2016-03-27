var _ = require('underscore');

function AsSelectableModel() {
  this.prototype.isSelectable = this.prototype.isSelectable || true;

  this.prototype.toggleSelect = function(select) {
    select ? this.select() : this.unselect();
  };

  this.prototype.unselect = function() {
    if (!this.selected) {
      return;
    }

    this.selected = false;
    this.trigger('selected', this, true);
  };

  this.prototype.select = function() {
    if (_.result(this, 'isSelectable') && !this.selected) {
      this.selected = true;
      this.trigger('selected', this, true);
    }
  };

  return this;
}

module.exports = AsSelectableModel;
