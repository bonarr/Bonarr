var Backbone = require('backbone');
var Marionette = require('marionette');

module.exports = Marionette.CompositeView.extend({
  itemViewContainer: '.item-list',
  template: 'Settings/ThingyHeaderGroupView',
  tagName: 'div',

  itemViewOptions: function() {
    return {
      targetCollection: this.targetCollection
    };
  },

  initialize: function(options) {
    options = options || {};

    this.targetCollection = options.targetCollection;
    this.collection = new Backbone.Collection(this.model.get('collection'));
  }
});