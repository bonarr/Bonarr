const Backbone = require('backbone');
const HealthModel = require('./HealthModel');
require('Mixins/backbone.signalr.mixin');

const HealthCollection = Backbone.Collection.extend({
  url: '/health',
  model: HealthModel
});

const healthCollection = new HealthCollection().bindSignalR();
healthCollection.fetch();

module.exports = healthCollection;
