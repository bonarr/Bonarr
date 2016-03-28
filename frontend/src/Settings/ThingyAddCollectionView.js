var Marionette = require('marionette');

module.exports = Marionette.CompositeView.extend({
  childViewOptions() {
    return {
      targetCollection: this.targetCollection
    };
  },

  initialize(options) {
    this.targetCollection = options.targetCollection;
  }
});
