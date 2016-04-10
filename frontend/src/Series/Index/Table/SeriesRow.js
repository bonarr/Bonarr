var Marionette = require('marionette');
var tableRowMixin = require('Table/tableRowMixin');
// var profileCollection = require('Profile/profileCollection');
var tpl = require('./SeriesRow.hbs');

const SeriesRow = Marionette.ItemView.extend({
  template: tpl,
  className: 'series-row'
});

tableRowMixin.apply(SeriesRow);

module.exports = SeriesRow;
