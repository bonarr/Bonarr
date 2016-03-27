const Marionette = require('marionette');
const tableRowMixin = require('Table/tableRowMixin');
const tpl = require('./SelectEpisodeRow.hbs');

const SelectEpisodeTableRow = Marionette.ItemView.extend({

  className: 'select-episode-row',
  template: tpl,

  ui: {
    selectCheckbox: '.select-checkbox'
  },

  events: {
    'click': '_toggle'
  },

  _toggle(e) {
    if (e.target.type === 'checkbox') {
      return;
    }

    e.preventDefault();

    var checked = this.ui.selectCheckbox.prop('checked');
    this.ui.selectCheckbox.prop('checked', !checked);
    this.ui.selectCheckbox.trigger('change');
  }
});

tableRowMixin.apply(SelectEpisodeTableRow);

module.exports = SelectEpisodeTableRow;
