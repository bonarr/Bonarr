const _ = require('underscore');
const Backbone = require('backbone');

const StateModel = Backbone.Model.extend({

  //
  // Initialize

  initialize(initialState) {
    this.set(initialState);
  },

  //
  // Control

  toData() {
    return _.pick(this.toJSON(), [
      'page',
      'pageSize',
      'sortKey',
      'sortDirection',
      'filterKey',
      'filterValue'
    ]);
  }

});

module.exports = StateModel;