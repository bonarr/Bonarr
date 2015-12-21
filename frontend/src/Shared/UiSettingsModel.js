const Backbone = require('backbone');

const UiSettings = Backbone.Model.extend({
  url: window.Sonarr.ApiRoot + '/config/ui',

  shortDateTime(includeSeconds) {
    return this.get('shortDateFormat') + ' ' + this.time(true, includeSeconds);
  },

  longDateTime(includeSeconds) {
    return this.get('longDateFormat') + ' ' + this.time(true, includeSeconds);
  },

  time(includeMinuteZero, includeSeconds) {
    const timeFormat = this.get('timeFormat');
    if (includeSeconds) {
      return timeFormat.replace(/\(?\:mm\)?/, ':mm:ss');
    }

    if (includeMinuteZero) {
      return timeFormat.replace('(', '').replace(')', '');
    }

    return timeFormat.replace(/\(\:mm\)/, '');
  }
});

module.exports = new UiSettings();
