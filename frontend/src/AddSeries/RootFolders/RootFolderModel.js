var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: '/rootfolder',
  defaults: {
    freeSpace: 0
  }
});
