var Backbone = require('backbone');
var LanguageModel = require('./LanguageModel');

var LanuageCollection = Backbone.Collection.extend({
    model : LanguageModel,
    url   : window.Sonarr.ApiRoot + '/language'
});

var languages = new LanuageCollection();
languages.fetch();

module.exports = languages;