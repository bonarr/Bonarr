var Handlebars = require('handlebars');
var FormatHelpers = require('Shared/FormatHelpers');
var moment = require('moment');
var episodeStatus = require('./Episode/episodeStatus');
var episodeNumber = require('./Episode/episodeNumber');
var statusLevel = require('./Episode/statusLevel');

Handlebars.registerHelper('episodeStatus', episodeStatus);
Handlebars.registerHelper('episodeNumber', episodeNumber);
Handlebars.registerHelper('statusLevel', statusLevel);

Handlebars.registerHelper('EpisodeProgressClass', function() {
  if (this.episodeFileCount === this.episodeCount) {
    if (this.status === 'continuing') {
      return '';
    }

    return 'progress-bar-success';
  }

  if (this.monitored) {
    return 'progress-bar-danger';
  }

  return 'progress-bar-warning';
});

