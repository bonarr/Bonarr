var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  url() {
    return this.get('contentsUrl');
  },

  parse(contents) {
    var response = {};
    response.contents = contents;
    return response;
  }
});