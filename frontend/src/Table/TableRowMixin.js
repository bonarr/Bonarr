const _ = require('underscore');

function tableRowMixin() {
  const superEvents = this.prototype.events || {};
  const superUi = this.prototype.ui || {};
  const superinitialize = this.prototype.initialize;

  const extentions = {
    tagName: 'tr',

    events: _.extend(superEvents, {
      'change .select-checkbox': '_tablerow_onSelectedChange'
    }),

    ui: _.extend(superUi, {
      selectCheckbox: '.select-checkbox'
    }),

    initialize(options = {}) {
      this.selectable = options.selectable;
      this.listenTo(this.model, 'selected', this._tablerow_refreshCheckbox);

      if (superinitialize) {
        superinitialize.apply(this, arguments);
      }
    },

    _tablerow_onSelectedChange(e) {
      e.preventDefault();
      const checked = !!this.ui.selectCheckbox.prop('checked');

      this.model.toggleSelect(checked);
      this._tablerow_refreshCheckbox();
    },

    _tablerow_refreshCheckbox() {
      const selected = this.model.selected;
      this.$el.toggleClass('selected', selected);
      this.ui.selectCheckbox.prop('checked', selected);
    }

  };

  this.prototype = _.extend(this.prototype, extentions);
  return this;
}

module.exports = tableRowMixin;
