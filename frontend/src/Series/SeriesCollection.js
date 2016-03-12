var _ = require('underscore');
var Backbone = require('backbone');
var SeriesModel = require('./SeriesModel');
var BackboneSortedCollection = require('backbone.sorted.collection');
var moment = require('moment');

var SeriesCollection = Backbone.Collection.extend({
  url: window.Sonarr.ApiRoot + '/series',
  model: SeriesModel,
  tableName: 'series',

  save() {
    var self = this;

    var proxy = _.extend(new Backbone.Model(), {
      id: '',

      url: self.url + '/editor',

      toJSON() {
        return self.filter(function(model) {
          return model.edited;
        });
      }
    });

    this.listenTo(proxy, 'sync', function(proxyModel, models) {
      this.add(models, { merge: true });
      this.trigger('save', this);
    });

    return proxy.save();
  },

  filterModes: {
    'all': {},
    'continuing': {
      key: 'status',
      value: 'continuing'
    },
    'ended': {
      key: 'status',
      value: 'ended'
    },
    'monitored': {
      key: 'monitored',
      value: true
    }
  },

  comparators: {
    title: (series) => series.get('sortTitle'),
    nextAiring: (series) => moment(series.get('nextAiring')).unix()
  },

  sortMappings: {
    title: {
      sortKey: 'sortTitle'
    },

    nextAiring: {
      sortValue(model, attr, order) {
        var nextAiring = model.get(attr);

        if (nextAiring) {
          return moment(nextAiring).unix();
        }

        if (order === 1) {
          return 0;
        }

        return Number.MAX_VALUE;
      }
    },

    percentOfEpisodes: {
      sortValue(model, attr) {
        var percentOfEpisodes = model.get(attr);
        var episodeCount = model.get('episodeCount');

        return percentOfEpisodes + episodeCount / 1000000;
      }
    },

    path: {
      sortValue(model) {
        var path = model.get('path');

        return path.toLowerCase();
      }
    }
  }
});

const seriesCollection = new SeriesCollection([]).bindSignalR();
seriesCollection.fetch();
seriesCollection.viewCollection = new BackboneSortedCollection(seriesCollection);

module.exports = seriesCollection;
