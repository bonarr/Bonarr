const _ = require('underscore');

function TableRowMixin(base) {
  const superEvents = base.events || {};
  const superinitialize = base.initialize;

  const extentions = {
    tagName: 'tr',

    events: _.extend(superEvents, {
      'change .select-checkbox': '_onSelectedChange'
    }),

    initialize(options = {}) {
      this.selectable = options.selectable;
      this.listenTo(this.model, 'select', this._onModelSelected);

      if (superinitialize) {
        superinitialize.apply(this, arguments);
      }
    },

    _onSelectedChange(e) {
      e.preventDefault();
      const checked = !!this.$('.select-checkbox').prop('checked');

      this.model.selected = checked;
      this.model.trigger('selected', this.model, checked);
    },

    _onModelSelected(model, selected) {
      this.$('.select-checkbox').prop('checked', selected);
    }

  };

  base = _.extend(base, extentions);
}

module.exports = TableRowMixin;
