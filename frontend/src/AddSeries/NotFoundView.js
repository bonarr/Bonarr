var Marionette = require('marionette');

module.exports = Marionette.CompositeView.extend({
  template: 'AddSeries/NotFoundViewTemplate',

  initialize(options) {
    this.options = options;
  },

  templateHelpers() {
    return this.options;
  }
});