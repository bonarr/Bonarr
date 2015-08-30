var HistoryModel = require('./HistoryModel');
var PageableCollection = require('backbone.paginator');
var AsFilteredCollection = require('../../Mixins/AsFilteredCollection');
var AsSortedCollection = require('../../Mixins/AsSortedCollection');
var AsPersistedStateCollection = require('../../Mixins/AsPersistedStateCollection');

var Collection = PageableCollection.extend({
    url   : window.Sonarr.ApiRoot + '/history',
    model : HistoryModel,

    state : {
        pageSize : 15,
        sortKey  : 'date',
        order    : 1
    },

    queryParams : {
        totalPages   : null,
        totalRecords : null,
        pageSize     : 'pageSize',
        sortKey      : 'sortKey',
        order        : 'sortDir',
        directions   : {
            '-1' : 'asc',
            '1'  : 'desc'
        }
    },

    filterModes : {
        'all'      : {},
        'grabbed'  : {
          key:  'eventType',
          value:  '1'
        },
        'imported' : {
            key: 'eventType',
            value: '3'
        },
        'failed'   : {
            key: 'eventType',
            value: '4'
        },
        'deleted'  : {
            key: 'eventType',
            value: '5'
        }
    },

    sortMappings : {
        'series' : { sortKey : 'series.sortTitle' }
    },

    initialize : function(options) {
        delete this.queryParams.episodeId;

        if (options) {
            if (options.episodeId) {
                this.queryParams.episodeId = options.episodeId;
            }
        }
    },

    parseState : function(resp) {
        return { totalRecords : resp.totalRecords };
    },

    parseRecords : function(resp) {
        if (resp) {
            return resp.records;
        }

        return resp;
    }
});

Collection = AsFilteredCollection.call(Collection);
Collection = AsSortedCollection.call(Collection);
Collection = AsPersistedStateCollection.call(Collection);

module.exports = Collection;