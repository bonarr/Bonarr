const _ = require('underscore');
const Backbone = require('backbone');
const SeriesModel = require('Series/SeriesModel');
const AsSelectableCollection = require('Mixins/Collection/AsSelectableCollection');

let SeriesSearchCollection = Backbone.Collection.extend({
  url: '/series/lookup',
  model: SeriesModel,

  parse(response) {
    _.each(response, (model) => {
      // make sure we don't have series with id of 0
      model.id = model.id || undefined;
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
