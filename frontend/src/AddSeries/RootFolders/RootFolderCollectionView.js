var Marionette = require('marionette');
var RootFolderItemView = require('./RootFolderItemView');

module.exports = Marionette.CompositeView.extend({
  template: 'AddSeries/RootFolders/RootFolderCollectionViewTemplate',
  childViewContainer: '.x-root-folders',
  childView: RootFolderItemView
});
