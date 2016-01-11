const Marionette = require('marionette');
const tpl = require('./TableView.hbs');

const TableView = Marionette.CompositeView.extend({
  tagName: 'table',
  className: 'table',
  template: tpl,
  itemViewContainer: 'tbody',

  ui: {
    selectCheckbox: '.select-all-checkbox'
  },

  events: {
    'change .select-all-checkbox': '_onSelectChange'
  },

  initialize(options = {}) {
    this.headers = options.headers;
    this.selectable = options.selectable;

    if (this.selectable) {
      this.listenTo(this.collection || this.collection.fullCollection, 'selected', this._onModelSelected);
    }
  },

  serializeData() {
    return {
      headers: this.headers,
      selectable: this.selectable
    };
  },

  itemViewOptions() {
    return {
      selectable: this.selectable
    };
  },

  _onSelectChange: function () {
    var checked = this.ui.selectCheckbox.prop('checked');

    if (checked) {
      this.collection.selectAllModels();
    } else {
      this.collection.unselectAllModels();
    }
  },

  _onModelSelected: function () {
    var allSelected = this.collection.getSelectedModels().length === this.collection.length;

    this.ui.selectCheckbox.prop('checked', allSelected);
  }
});

module.exports = TableView;
