const Backbone = require('backbone');
const EpisodeModel = require('Series/EpisodeModel');
const asSignalRCollection = require('Mixins/Collection/asSignalRCollection');

const CalendarCollection = Backbone.Collection.extend({
  url: '/calendar',
  model: EpisodeModel,
  tableName: 'calendar',

  comparator(model) {
    const date = new Date(model.get('airDateUtc'));
    const time = date.getTime();
    return time;
  }
});

asSignalRCollection.apply(CalendarCollection.prototype);

module.exports = CalendarCollection;
