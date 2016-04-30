const Backbone = require('backbone');
const moment = require('moment');
const EpisodeModel = require('Series/EpisodeModel');
const asSignalRCollection = require('Mixins/Collection/asSignalRCollection');

const UpcomingCollection = Backbone.Collection.extend({
  url: '/calendar',
  model: EpisodeModel,

  comparator(model1, model2) {
    const airDate1 = model1.get('airDateUtc');
    const date1 = moment(airDate1);
    const time1 = date1.unix();

    const airDate2 = model2.get('airDateUtc');
    const date2 = moment(airDate2);
    const time2 = date2.unix();

    if (time1 < time2) {
      return -1;
    }

    if (time1 > time2) {
      return 1;
    }

    return 0;
  }
});

asSignalRCollection.apply(UpcomingCollection.prototype);

module.exports = UpcomingCollection;
