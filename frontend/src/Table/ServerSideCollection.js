const _ = require('underscore');
const Backbone = require('backbone');
const Config = require('Config');
const StateModel = require('./StateModel');

const ServerSideCollection = Backbone.Collection.extend({

  //
  // Initialize

  initialize(models = [], options = {}) {
    if (!this.initialState) {
      throw new Error('`initialState` is required');
    }

    if (this.storeState) {
      this.tableName = options.tableName || this.tableName;

      if (!this.tableName) {
        throw new Error('`tableName` is required to store state');
      }

      const sortKey = this._getStoredState('sortKey', this.initialState.sortKey);
      const sortDirection = this._getStoredState('sortDirection', this.initialState.sortDirection);
      const state = _.extend({}, this.initialState, { sortKey, sortDirection });

      this.state = new StateModel(state);
    } else {
      this.state = new StateModel(this.initialState);
    }
  },

  //
  // Control

  setFilterMode(filterMode) {
    return this.setFilter(this.filterModes[filterMode]);

    // TODO: Do we need to store the state for filtering or is that handled elsewhere?
    //     if (this.storeState) {
    //       this._storeState('filterMode', filterMode);
    //     }
  },

  setFilter({ key, value }) {
    this.state.set({
      filterKey: key,
      filterValue: value
    });

    return this.fetch();
  },

  setSort({ key, direction }) {
    // TODO: Look up sort mapping (do we need that?) or can the caller specify it?

    this.state.set({
      sortKey: key,
      sortDirection: direction
    });

    if (this.storeState) {
      this._storeState('sortKey', key);
      this._storeState('sortDirection', direction);
    }

    return this.fetch();
  },

  firstPage() {
    this.state.set('page', 1);
    return this.fetch();
  },

  previousPage() {
    this.state.set('page', this.state.get('page') - 1);
    return this.fetch();},

  nextPage() {
    this.state.set('page', this.state.get('page') + 1);
    return this.fetch();},

  lastPage() {
    this.state.set('page', this.state.get('totalPages'));
    return this.fetch();},

  page(pageNumber) {
    this.state.set('page', pageNumber);
    return this.fetch();},

  fetch(options = {}) {
    options.data = _.extend(options.data || {}, { page: 1 }, this.state.toData());

    // Ensure options is set and pass along any other arguments that we're passed nn
    const args = [options];

    for (let i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    return Backbone.Collection.prototype.fetch.apply(this, args);
  },

  parse(resp) {
    const newState = _.extend(
      _.omit(resp, ['records']),
      { totalPages: Math.ceil(resp.totalRecords / resp.pageSize) }
    );

    this.state.set(newState);

    return resp.records;
  },

  _storeState(key, value) {
    Config.setValue(`${this.tableName}.${key}`, value);
  },

  _getStoredState(key, defaultValue) {
    return Config.getValue(`${this.tableName}.${key}`, defaultValue);
  }

});

module.exports = ServerSideCollection;
