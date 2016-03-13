const Backbone = require('backbone');
const ProfileModel = require('./ProfileModel');

const ProfileCollection = Backbone.Collection.extend({
  model: ProfileModel,
  url: '/profile'
});

const profileCollection = new ProfileCollection();

profileCollection.fetch();

module.exports = profileCollection;
