var _ = require('underscore');
var Backbone = require('backbone');
var SeriesModel = require('Series/SeriesModel');
var AsSelectableCollection = require('Mixins/Collection/AsSelectableCollection');

let AddSeriesCollection = Backbone.Collection.extend({
  url: window.Sonarr.ApiRoot + '/series/lookup',
  model: SeriesModel,

  parse(response) {
    _.each(response, (model) => {
      model.id = undefined;
      if (self.unmappedFolderModel) {
        model.path = self.unmappedFolderModel.get('folder').path;
      }
    });

    return response;
  },

  search(term) {
    this.term = term;
    return this.fetch({
      data: {
        term: term
      }
    });
  }
});

AddSeriesCollection = AsSelectableCollection.apply(AddSeriesCollection);

module.exports = AddSeriesCollection;
