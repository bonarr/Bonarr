var vent = require('vent');
var Marionette = require('marionette');
var RestrictionItemView = require('./RestrictionItemView');
var EditView = require('./RestrictionEditView');
require('../../../Tags/TagHelpers');
require('bootstrap');

module.exports = Marionette.CompositeView.extend({
  template: 'Settings/Indexer/Restriction/RestrictionCollectionView',
  itemViewContainer: '.x-rows',
  itemView: RestrictionItemView,

  events: {
    'click .x-add': '_addMapping'
  },

  _addMapping() {
    var model = this.collection.create({ tags: [] });
    var view = new EditView({
      model: model,
      targetCollection: this.collection
    });

    vent.trigger(vent.Commands.OpenFullscreenModal, view);
  }
});