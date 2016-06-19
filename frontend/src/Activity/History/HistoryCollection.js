var ServerSideCollection = require('Table/ServerSideCollection');
var AsPersistedStateCollection = require('Mixins/AsPersistedStateCollection');
var HistoryModel = require('./HistoryModel');

var Collection = ServerSideCollection.extend({
  url: '/history',
  model: HistoryModel,

  storeState: true,

  initialState: {
    pageSize: 15,
    sortKey: 'date',
    sortDirection: 'desc'
  },

  filterModes: {
    all: {},

    grabbed: {
      key: 'eventType',
      value: '1'
    },

    imported: {
      key: 'eventType',
      value: '3'
    },

    failed: {
      key: 'eventType',
      value: '4'
    },

    deleted: {
      key: 'eventType',
      value: '5'
    }
  },

  sortMappings: {
    series: { sortKey: 'series.sortTitle' }
  }

});

module.exports = Collection;
