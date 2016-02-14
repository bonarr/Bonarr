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

  _onSelectChange() {
    const checked = this.ui.selectCheckbox.prop('checked');
    this.collection.toggleAll(checked);
  },

  _onModelSelected() {
    this.ui.selectCheckbox.prop('checked', this.collection.allSelected());
  }
});

module.exports = TableView;
