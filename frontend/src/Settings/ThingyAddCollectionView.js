var Marionette = require('marionette');

module.exports = Marionette.CompositeView.extend({
  itemViewOptions() {
    return {
      targetCollection: this.targetCollection
    };
  },

  initialize(options) {
    this.targetCollection = options.targetCollection;
  }
});