var Marionette = require('marionette');
var tpl = require('./ErrorView.hbs');

module.exports = Marionette.CompositeView.extend({
  template: tpl,

  initialize(options) {
    this.term = options.term;
    this.xhr = options.xhr;
  },

  templateHelpers() {
    var xhr = this.xhr;

    var data = {
      status: xhr.status,
      statusText: xhr.statusText
    };

    if (xhr) {
      try {
        var messageJson = JSON.parse(xhr.responseText);
        if (messageJson && messageJson.message) {
          data.message = messageJson.message;
        }
      } catch (e) {}
    }

    if (!data.message) {
      data.message = 'An error occurred while searching for \'' + this.term + '\'';
    }

    return data;
  }
});
