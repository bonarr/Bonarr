const Marionette = require('marionette');
const TableRowMixin = require('Table/TableRowMixin');
const tpl = require('./DiskSpaceRow.hbs');

const DiskSpaceRow = Marionette.ItemView.extend({

  className: 'disk-space-row',
  template: tpl

});

TableRowMixin(DiskSpaceRow);

module.exports = DiskSpaceRow;
