const Marionette = require('marionette');
const tableRowMixin = require('Table/tableRowMixin');
const tpl = require('./BackupRow.hbs');

const BackupRow = Marionette.ItemView.extend({

  className: 'backup-row',
  template: tpl

});

tableRowMixin.apply(BackupRow);

module.exports = BackupRow;
