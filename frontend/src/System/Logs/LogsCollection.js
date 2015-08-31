var PagableCollection = require('backbone.paginator');
var LogsModel = require('./LogsModel');
var AsFilteredCollection = require('../../Mixins/AsFilteredCollection');
var AsPersistedStateCollection = require('../../Mixins/AsPersistedStateCollection');

var collection = PagableCollection.extend({
  url: window.Sonarr.ApiRoot + '/log',
  model: LogsModel,
  tableName: 'logs',

  state: {
    pageSize: 50,
    sortKey: 'time',
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
    "all": {},
    "info": {
      key: 'level',
      value: 'Info'
    },
    "warn": {
      key: 'level',
      value: 'Warn'
    },
    "error": {
      key: 'level',
      value: 'Error'
    }
  },

  parseState: function(resp, queryParams, state) {
    return {totalRecords: resp.totalRecords};
  },

  parseRecords: function(resp) {
    if (resp) {
      return resp.records;
    }

    return resp;
  }
});

collection = AsFilteredCollection.apply(collection);

module.exports = AsPersistedStateCollection.apply(collection);