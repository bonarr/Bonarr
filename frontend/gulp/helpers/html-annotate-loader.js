var path = require('path');
var rootPath = path.resolve(__dirname + '/../../src/');
module.exports = function(source) {
  if (this.cacheable) {
    this.cacheable();
  }

  var resourcePath = this.resourcePath.replace(rootPath, '');
  var wrappedSource =`
  <!-- begin ${resourcePath} -->
    ${source}
  <!-- end ${resourcePath} -->`;

  return wrappedSource;
};
