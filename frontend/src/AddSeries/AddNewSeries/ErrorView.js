const Marionette = require('marionette');
const tpl = require('./ErrorView.hbs');

module.exports = Marionette.CompositeView.extend({
  template: tpl,

  initialize(options = {}) {
    this.term = options.term;
    this.xhr = options.xhr;
  },

  serializeData() {
    const xhr = this.xhr;
    const data = {
      status: xhr.status,
      statusText: xhr.statusText
    };

    if (xhr) {
      try {
        const messageJson = JSON.parse(xhr.responseText);
        if (messageJson && messageJson.message) {
          data.message = messageJson.message;
        }
      } catch (e) {
        console.error(e);
      }
    }

    data.message = data.message || `An error occurred while searching for '${this.term}'`;

    return data;
  }
});
