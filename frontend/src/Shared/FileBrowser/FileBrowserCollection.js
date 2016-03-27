var _ = require('underscore');
var Backbone = require('backbone');
var FileBrowserModel = require('./FileBrowserModel');

module.exports = Backbone.Collection.extend({
  model: FileBrowserModel,
  url: '/filesystem',

  parse(response) {
    var contents = [];
    if (response.parent || response.parent === '') {
      var type = 'parent';
      var name = '...';
      if (response.parent === '') {
        type = 'computer';
        name = 'My Computer';
      }
      contents.push({
        type,
        name,
        path: response.parent
      });
    }

    return _.union(contents, response.directories, response.files);
  }
});
