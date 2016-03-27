const Marionette = require('marionette');
const tableRowMixin = require('Table/tableRowMixin');
const tpl = require('./HealthRow.hbs');

const HealthRow = Marionette.ItemView.extend({

  className: 'health-row',
  template: tpl

});

tableRowMixin.apply(HealthRow);

module.exports = HealthRow;
