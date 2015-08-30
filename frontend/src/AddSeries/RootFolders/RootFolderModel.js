var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    urlRoot  : window.Sonarr.ApiRoot + '/rootfolder',
    defaults : {
        freeSpace : 0
    }
});