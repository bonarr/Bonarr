const Backbone = require('backbone');
const HealthModel = require('./HealthModel');
const asSignalRCollection = require('Mixins/Collection/asSignalRCollection');

const HealthCollection = Backbone.Collection.extend({
  url: '/health',
  model: HealthModel
});

asSignalRCollection.apply(HealthCollection.prototype);

const healthCollection = new HealthCollection();
healthCollection.fetch();

module.exports = healthCollection;
