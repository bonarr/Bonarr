var Marionette = require('marionette');
var RenamePreviewItemView = require('./RenamePreviewItemView');

module.exports = Marionette.CollectionView.extend({
  childView: RenamePreviewItemView
});
