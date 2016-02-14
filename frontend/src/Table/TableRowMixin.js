const _ = require('underscore');

const selectBoxSelector = '.select-checkbox';

function TableRowMixin(base) {
  const superEvents = base.events || {};
  const superinitialize = base.initialize;

  const extentions = {
    tagName: 'tr',

    events: _.extend(superEvents, {
      'change .select-checkbox': '_tablerow_onSelectedChange'
    }),

    initialize(options = {}) {
      this.selectable = options.selectable;
      this.listenTo(this.model, 'selected', this._tablerow_onModelSelected);

      if (superinitialize) {
        superinitialize.apply(this, arguments);
      }
    },

    _tablerow_onSelectedChange(e) {
      e.preventDefault();
      const checked = !!this.$(selectBoxSelector).prop('checked');

      this.model.selected = checked;
      this.model.trigger('selected', this.model, checked);
    },

    _tablerow_onModelSelected(model, selected) {
      this.$el.toggleClass('selected', selected);
      this.$(selectBoxSelector).prop('checked', selected);
    }

  };

  base = _.extend(base, extentions);
}

module.exports = TableRowMixin;
