var Backbone = require('backbone');
var ImportSeriesModel = require('./ImportSeriesModel');
var AsSelectableCollection = require('Mixins/Collection/AsSelectableCollection');

let ImportSeriesCollection = Backbone.Collection.extend({
  model: ImportSeriesModel
});

ImportSeriesCollection = AsSelectableCollection.apply(ImportSeriesCollection);

module.exports = ImportSeriesCollection;
