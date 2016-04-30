const EpisodeModel = require('Series/EpisodeModel');
const PagableCollection = require('backbone.paginator');
const AsFilteredCollection = require('Mixins/AsFilteredCollection');
const AsSortedCollection = require('Mixins/AsSortedCollection');
const AsPersistedStateCollection = require('Mixins/AsPersistedStateCollection');
const asSignalRCollection = require('Mixins/Collection/asSignalRCollection');

let MissingCollection = PagableCollection.extend({
  url: '/wanted/missing',
  model: EpisodeModel,
  tableName: 'wanted.missing',

  state: {
    pageSize: 15,
    sortKey: 'airDateUtc',
    order: 1
  },

  queryParams: {
    totalPages: null,
    totalRecords: null,
    pageSize: 'pageSize',
    sortKey: 'sortKey',
    order: 'sortDir',
    directions: {
      '-1': 'asc',
      '1': 'desc'
    }
  },

  filterModes: {
    'monitored': {
      key: 'monitored',
      value: 'true'
    },
    'unmonitored': {
      key: 'monitored',
      value: 'false'
    }
  },

  sortMappings: {
    'series': { sortKey: 'series.sortTitle' }
  },

  parseState(resp) {
    return { totalRecords: resp.totalRecords };
  },

  parseRecords(resp) {
    if (resp) {
      return resp.records;
    }

    return resp;
  }
});

MissingCollection = AsFilteredCollection.call(MissingCollection);
MissingCollection = AsSortedCollection.call(MissingCollection);
asSignalRCollection.call(MissingCollection.prototype);

module.exports = AsPersistedStateCollection.call(MissingCollection);
