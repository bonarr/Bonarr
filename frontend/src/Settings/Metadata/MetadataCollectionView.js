var Marionette = require('marionette');
var MetadataItemView = require('./MetadataItemView');

module.exports = Marionette.CompositeView.extend({
  childView: MetadataItemView,
  childViewContainer: '#x-metadata',
  template: 'Settings/Metadata/MetadataCollectionView'
});
