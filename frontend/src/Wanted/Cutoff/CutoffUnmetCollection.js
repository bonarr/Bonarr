const EpisodeModel = require('Series/EpisodeModel');
const PagableCollection = require('backbone.paginator');
const AsFilteredCollection = require('Mixins/AsFilteredCollection');
const AsSortedCollection = require('Mixins/AsSortedCollection');
const AsPersistedStateCollection = require('Mixins/AsPersistedStateCollection');
const asSignalRCollection = require('Mixins/Collection/asSignalRCollection');

let CutoffUnmetCollection = PagableCollection.extend({
  url: '/wanted/cutoff',
  model: EpisodeModel,
  tableName: 'wanted.cutoff',

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

CutoffUnmetCollection = AsFilteredCollection.call(CutoffUnmetCollection);
CutoffUnmetCollection = AsSortedCollection.call(CutoffUnmetCollection);
asSignalRCollection.call(CutoffUnmetCollection.prototype);

module.exports = AsPersistedStateCollection.call(CutoffUnmetCollection);
