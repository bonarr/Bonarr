const Marionette = require('marionette');
const TableRowMixin = require('Table/TableRowMixin');
const tpl = require('./BackupRow.hbs');

const BackupRow = Marionette.ItemView.extend({

  className: 'backup-row',
  template: tpl

});

TableRowMixin(BackupRow);

module.exports = BackupRow;
