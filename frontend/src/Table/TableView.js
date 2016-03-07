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
    'click .select-all-checkbox': 'onSelectAllClick'
  },

  initialize(options = {}) {
    this.headers = options.headers;
    this.selectable = options.selectable;

    this.itemViewOptions = _.extend({
      selectable: this.selectable
    }, options.itemViewOptions);

    this.listenTo(this.collection, 'add remove update', this.onCollectionUpdate);

    if (this.selectable) {
      this.listenTo(this.collection || this.collection.fullCollection, 'selected', _.debounce(this.updateSelectAllState, 10));
      this.listenTo(this, 'render', this.updateSelectAllState);
    }
  },

  updateSelectAllState() {
    const anySelected = this.collection.anySelected();
    const allSelected = this.collection.allSelected();

    this.ui.selectAllCheckbox.prop('checked', anySelected);
    this.ui.selectAllCheckbox.prop('indeterminate', anySelected && !allSelected);
  },

  serializeData() {
    return {
      headers: this.headers,
      selectable: this.selectable
    };
  },

  onSelectAllClick(e) {
    e.preventDefault();
    const checked = this.ui.selectAllCheckbox.prop('checked');
    this.collection.toggleAll(checked);
  },

  onCollectionUpdate() {
    this.render();
  }
});

module.exports = TableView;
