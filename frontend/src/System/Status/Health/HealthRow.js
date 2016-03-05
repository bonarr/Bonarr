const Marionette = require('marionette');
const TableRowMixin = require('Table/TableRowMixin');
const tpl = require('./HealthRow.hbs');

const HealthRow = Marionette.ItemView.extend({

  className: 'health-row',
  template: tpl

});

TableRowMixin(HealthRow);

module.exports = HealthRow;
