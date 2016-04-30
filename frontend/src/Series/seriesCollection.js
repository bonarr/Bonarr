const _ = require('underscore');
const Backbone = require('backbone');
const SeriesModel = require('./SeriesModel');
const moment = require('moment');
const asSignalRCollection = require('Mixins/Collection/asSignalRCollection');

const SeriesCollection = Backbone.Collection.extend({
  url: '/series',
  model: SeriesModel,
  tableName: 'series',

  save() {
    const proxy = _.extend(new Backbone.Model(), {
      id: '',
      url: `${this.url}/editor`,

      toJSON() {
        return self.filter((model) => {
          return model.edited;
        });
      }
    });

    this.listenToOnce(proxy, 'sync', (proxyModel, models) => {
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
        const nextAiring = model.get(attr);

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
        const percentOfEpisodes = model.get(attr);
        const episodeCount = model.get('episodeCount');

        return percentOfEpisodes + episodeCount / 1000000;
      }
    },

    path: {
      sortValue(model) {
        const path = model.get('path');
        return path.toLowerCase();
      }
    }
  }
});

asSignalRCollection.apply(SeriesCollection.prototype);

const seriesCollection = new SeriesCollection();
seriesCollection.fetch();

module.exports = seriesCollection;
