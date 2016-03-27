const Marionette = require('marionette');
const tableRowMixin = require('Table/tableRowMixin');
const tpl = require('./DiskSpaceRow.hbs');

const DiskSpaceRow = Marionette.ItemView.extend({

  className: 'disk-space-row',
  template: tpl

});

tableRowMixin.apply(DiskSpaceRow);

module.exports = DiskSpaceRow;
