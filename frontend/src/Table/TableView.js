const _ = require('underscore');
const Marionette = require('marionette');
const tpl = require('./TableView.hbs');

const TableView = Marionette.CompositeView.extend({
  tagName: 'table',
  className: 'table',
  template: tpl,
  itemViewContainer: 'tbody',

  ui: {
    selectAllCheckbox: '.select-all-checkbox'
  },

  events: {
    'change .select-all-checkbox': 'onSelectChange'
  },

  initialize(options = {}) {
    this.headers = options.headers;
    this.selectable = options.selectable;

    this.itemViewOptions = _.extend({
      selectable: this.selectable
    }, options.itemViewOptions);

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

  onSelectChange() {
    const checked = this.ui.selectAllCheckbox.prop('checked');
    this.collection.toggleAll(checked);
  },

  _onModelSelected() {
    this.ui.selectAllCheckbox.prop('checked', this.collection.allSelected());
  }
});

module.exports = TableView;
