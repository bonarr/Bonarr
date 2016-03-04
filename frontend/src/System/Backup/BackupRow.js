const Marionette = require('marionette');
const TableRowMixin = require('Table/TableRowMixin');
const tpl = require('./BackupRow.hbs');

const EpisodeRow = Marionette.ItemView.extend({

  className: 'backup-row',
  template: tpl

});

TableRowMixin(EpisodeRow);

module.exports = EpisodeRow;
