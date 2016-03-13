var Backbone = require('backbone');
var LogFileModel = require('./LogFileModel');

module.exports = Backbone.Collection.extend({
  url: '/log/file',
  model: LogFileModel,

  state: {
    sortKey: 'lastWriteTime',
    order: 1
  }
});
