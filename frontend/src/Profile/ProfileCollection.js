var Backbone = require('backbone');
var ProfileModel = require('./ProfileModel');

var ProfileCollection = Backbone.Collection.extend({
    model : ProfileModel,
    url   : window.Sonarr.ApiRoot + '/profile'
});

var profiles = new ProfileCollection();

profiles.fetch();

module.exports = profiles;
