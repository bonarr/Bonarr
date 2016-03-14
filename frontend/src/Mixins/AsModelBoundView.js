const ModelBinder = require('backbone.modelbinder');

function asModelBoundView() {
  const originalOnRender = this.prototype.onRender;
  const originalBeforeClose = this.prototype.onBeforeClose;

  this.prototype.onRender = function() {
    if (!this.model) {
      throw Error('View has no model for binding');
    }

    this._modelBinder = this._modelBinder || new ModelBinder();

    const options = {
      changeTriggers: {
        '': 'change typeahead:selected typeahead:autocompleted',
        '[contenteditable]': 'blur',
        '[data-onkeyup]': 'keyup'
      }
    };

    this._modelBinder.bind(this.model, this.el, this.bindings, options);

    if (originalOnRender) {
      return originalOnRender.apply(this, arguments);
    }
  };

  this.prototype.onBeforeClose = function() {
    if (this._modelBinder) {
      this._modelBinder.unbind();
      delete this._modelBinder;
    }

    if (originalBeforeClose) {
      return originalBeforeClose.apply(this, arguments);
    }
  };

  return this;
}

module.exports = asModelBoundView;
