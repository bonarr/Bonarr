const _ = require('underscore');

function TableRowMixin({ prototype: base }) {
  const superEvents = base.events || {};
  const superUi = base.ui || {};
  const superinitialize = base.initialize;

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

  base = _.extend(base, extentions);
}

module.exports = TableRowMixin;
