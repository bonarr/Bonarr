var _ = require('underscore');
var Backbone = require('backbone');
var SeriesModel = require('Series/SeriesModel');
var AsSelectableCollection = require('Mixins/Collection/AsSelectableCollection');

let SeriesSearchCollection = Backbone.Collection.extend({
  url: '/series/lookup',
  model: SeriesModel,

  parse(response) {
    _.each(response, (model) => {
      model.id = undefined;
      if (this.unmappedFolderModel) {
        model.path = this.unmappedFolderModel.get('folder').path;
      }
    });

    return response;
  },

  search(term) {
    term = term.trim();

    if (!term) {
      this.abort();
      this.reset();
      return;
    }

    if (this.searchPromise && this.term === term) {
      return this.searchPromise;
    }

    this.abort();
    this.reset();
    this.term = term;

    console.log(`Searching for [${term}]`);
    this.searchPromise = this.fetch({
      data: {
        term
      }
    });
    return this.searchPromise;
  },

  abort() {
    if (this.searchPromise) {
      console.log(`Aborting ssearching for [${this.term}]`);
      this.searchPromise.abort();
      this.searchPromise = undefined;
    }
    this.term = undefined;
  }
});

SeriesSearchCollection = AsSelectableCollection.apply(SeriesSearchCollection);

module.exports = SeriesSearchCollection;
