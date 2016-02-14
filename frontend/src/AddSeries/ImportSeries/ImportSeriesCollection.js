// var _ = require('underscore');
var Backbone = require('backbone');
var AsSelectableCollection = require('Mixins/Collection/AsSelectableCollection');

let AddSeriesCollection = Backbone.Collection.extend({

});

AddSeriesCollection = AsSelectableCollection.apply(AddSeriesCollection);

module.exports = AddSeriesCollection;
