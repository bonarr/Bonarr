const _ = require('underscore');
const PageableCollection = require('backbone.paginator');
const QueueModel = require('./QueueModel');
const FormatHelpers = require('Shared/FormatHelpers');
const AsSortedCollection = require('Mixins/AsSortedCollection');
const AsPageableCollection = require('Mixins/AsPageableCollection');
const moment = require('moment');

const QueueCollection = PageableCollection.extend({
  url: '/queue',
  model: QueueModel,

  state: {
    pageSize: 15,
    sortKey: 'timeleft'
  },

  mode: 'client',

  findEpisode(episodeId) {
    return _.find(this.fullCollection.models, (queueModel) => {
      return queueModel.get('episode').id === episodeId;
    });
  },

  sortMappings: {
    series: {
      sortValue(model, attr) {
        const series = model.get(attr);

        return series.get('sortTitle');
      }
    },

    episode: {
      sortValue(model, attr) {
        const episode = model.get('episode');
        return FormatHelpers.pad(episode.get('seasonNumber'), 4) + FormatHelpers.pad(episode.get('episodeNumber'), 4);
      }
    },

    episodeTitle: {
      sortValue(model, attr) {
        const episode = model.get('episode');

        return episode.get('title');
      }
    },

    timeleft: {
      sortValue(model, attr) {
        const eta = model.get('estimatedCompletionTime');

        if (eta) {
          return moment(eta).unix();
        }

        return Number.MAX_VALUE;
      }
    },

    sizeleft: {
      sortValue(model, attr) {
        const size = model.get('size');
        const sizeleft = model.get('sizeleft');

        if (size && sizeleft) {
          return sizeleft / size;
        }

        return 0;
      }
    }
  }
});

AsSortedCollection.call(QueueCollection);
AsPageableCollection.call(QueueCollection);

module.exports = QueueCollection;
