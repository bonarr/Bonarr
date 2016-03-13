var Backbone = require('backbone');
var LogFileModel = require('./LogFileModel');

module.exports = Backbone.Collection.extend({
  url: '/log/file/update',
  model: LogFileModel,

  state: {
    sortKey: 'lastWriteTime',
    order: 1
  }
});
