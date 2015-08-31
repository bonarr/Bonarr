var Marionette = require('marionette');

module.exports = Marionette.CompositeView.extend({
  template: 'AddSeries/ErrorViewTemplate',

  initialize: function(options) {
    this.options = options;
  },

  templateHelpers: function() {
    var xhr = this.xhr;

    var data = {
      status: xhr.status,
      statusText: xhr.statusText
    };

    if (options.xhr) {
      var messageJson = JSON.parse(xhr.responseText);
      if (messageJson && messageJson.message) {
        data.message = messageJson.message;
      }
    }

    if (!data.message) {
      data.message = 'An error occurred while searching for ' + options.term;
    }

    return data;
  }
});