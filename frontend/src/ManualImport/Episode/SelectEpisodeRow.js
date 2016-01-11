const _ = require('underscore');
const TableRow = require('../../Table/TableRow');
const tpl = require('./SelectEpisodeRow.hbs');

const SelectTableRow = TableRow.extend({
  tagName: 'tr',
  className: 'select-episode-row',
  template: tpl,

  ui: {
    selectCheckbox: '.select-checkbox'
  },

  events: _.extend(TableRow.prototype.events, {
    'click': '_toggle'
  }),

  _toggle: function(e) {
    if (e.target.type === 'checkbox') {
      return;
    }

    e.preventDefault();

    var checked = this.ui.selectCheckbox.prop('checked');
    this.ui.selectCheckbox.prop('checked', !checked);
    this.ui.selectCheckbox.trigger('change');
  }
});

module.exports = SelectTableRow;
