// var _ = require('underscore');
var Backbone = require('backbone');
var AsSelectableCollection = require('Mixins/Collection/AsSelectableCollection');

let ImportSeriesCollection = Backbone.Collection.extend({

});

ImportSeriesCollection = AsSelectableCollection.apply(ImportSeriesCollection);

module.exports = ImportSeriesCollection;
