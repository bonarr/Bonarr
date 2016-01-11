const Marionette = require('marionette');

const TableRow = Marionette.ItemView.extend({
  tagName: 'tr',

  events: {
    'change .select-checkbox': '_onSelectedChange'
  },

  initialize(options = {}) {
    this.selectable = options.selectable;
    this.listenTo(this.model, 'select', this._onModelSelected);
  },

  templateHelpers: function () {
    return {
      selectable: this.selectable
    };
  },

  _onSelectedChange: function (e) {
    e.preventDefault();
    var checked = this.$el.find('.select-checkbox').prop('checked');

    this.model.selected = checked;
    this.model.trigger('selected', this.model, checked);
  },

  _onModelSelected: function (model, selected) {
    this.$el.find('.select-checkbox').prop('checked', selected);
  }
});

module.exports = TableRow;
