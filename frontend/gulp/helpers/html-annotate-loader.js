var path = require('path');
var rootPath = path.resolve(__dirname + '/../../src/');
module.exports = function(source) {
  'use strict';

  if (this.cacheable) {
    this.cacheable();
  }

  var resourcePath = this.resourcePath.replace(rootPath, '');
  var wrappedSource = '<!-- begin ' + resourcePath + ' -->\n' + source +
    '\n<!-- end ' + resourcePath + ' -->';

  return wrappedSource;
};
